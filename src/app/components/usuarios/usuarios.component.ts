import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { Usuarios } from '../../interfaces/usuarios.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  public usuario$!:Observable<Usuarios[]>;
  public textoBusqueda:string = '';

  constructor(private usuarioServices:UsersService){
  }

  ngOnInit(): void {
      this.usuario$ = this.usuarioServices.busqueda();
      this.usuario$.subscribe(response => {
        console.log(response);

      })
  }

  busqueda = (term:string) => {
    this.usuarioServices.busquedaInput(term);
  }

}
