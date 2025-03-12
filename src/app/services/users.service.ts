import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from '../inertfaces/usuarios.interface';
import { catchError, finalize, forkJoin, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { Pais } from '../inertfaces/pais.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string = 'https://649088911e6aa71680cb6c15.mockapi.io/users';
  private urlsPais: string = ' https://api.worldbank.org/v2/country';
  private avatar_url: string = 'https://ui-avatars.com/api/?name=';
  private flag_url: string = 'https://flagsapi.com';

  constructor(
    private http: HttpClient,
    private spinner:NgxSpinnerService

  ) {}



  getUsuario = () => {
    this.spinner.show();
    return this.http.get<Usuarios[]>(`${this.url}`).pipe(
          //tap se usa para ejecutar efectos secundarios sin modificar los datos
          tap(() => this.spinner.show()), //Se activa el spinner
          //switchMap toma la lista de usuarios y en lugar de devolverla directamente la transforma a una nueva secuencia de peticiones
          switchMap(users => forkJoin(users.map(user => this.getUserWithCountry(user)))),
          finalize(() => this.spinner.hide()), // se ejecuta siempre, ya sea que la peticion haya sido exitosa o haya fallado
      /*
      Guarda la ultima respuesta para evitar que se hagan multiples solicitudes innecesarias
      Si alguien vuelve a solictar la lista de usuarios se devuelve la version almacenada en cache en lugar
      de hacer una nueva peticion
      */
      shareReplay(1)
    );
  };

  private getUserWithCountry = (user:Usuarios):Observable<Usuarios> => {
    return this.http.get<[any, Pais[]]>(`${this.urlsPais}/${user.country}?format=json`).pipe(
       //Manejo de errores con catchError
     /*
              Extrae el primer elemento del array de paises[1][0], que es la informacion del pais
              Si la respueta no es valida devuelve null
              si la API de paises falla, en lugar de hacer que toda la funcion falle simplemente devuelve null
     */

      map(response => response?.[1]?.[0] ?? null),
      catchError(() => of(null)),
         /*
                Transformar el usuario con la nueva informacion.
                en esra parte del codigo agrega una nueva propiedad nacionalidad al usuario con el nombre del pais.
                Si countryData es null, asigna 'Desconocido'.
                avatarUrl Genera un linkl para el avatar del usuario
                flagUrl genera un link para la bandera del pais basado en el copdigo del pais

                */
      map(countryData => ({
        ...user,
        nacionalidad: countryData?.name ?? 'Desconocido',
        avatarUrl: `${this.avatar_url}${encodeURIComponent(user.first_name)}`,
        flagUrl: `${this.flag_url}/${user.country}/flat/${64}.png`,
      }))
    );
  }


}

/*
RESUMEN:
Se limitan los datos a 25 usuarios,
Se hacen llamadas en paralelo con forkJoin, lo que reduce el tiempo de espera,
se usa shreReplay(1) para evitar multiples peticiones innecesarias.
*/
