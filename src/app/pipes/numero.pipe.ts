import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeroTelefonico'
})
export class NumeroPipe implements PipeTransform {

  /*
  Creamos un objeto que almacena el codigo telefonico internacional de cada pias usando el codigo ISO del pais clave
  como 'SV' -> '+503'
    Es un objeto de tipo { [key: string]: string }, lo que significa que cada clave es un string (el código del país)
     y su valor es otro string (el código telefónico).
  */
  private  countryCodes: { [key:string]:string} = {
    'SV': '+503',
    'MX': '+52',
    'US': '+1',
    'AR': '+54',
    'CO': '+57',
    'ES': '+34',
    'PE': '+51',
    'CL': '+56',
    'VE': '+58',
    'EC': '+593',
    'JP': '+81',
    'MG': '+261',
    'ID': '+62',
    'CN': '+86',
    'GH': '+233',
    'GR': '+30',
    'RU': '+7',
    'CA': '+1',
    'MD': '+373',
    'AL': '+355',
    'PH': '+63',
    'MN': '+976',
    'DO': '+1',
    'CZ': '+420',
    'BR': '+55',
    'PK': '+92'



  }
  transform(numeroTelefonico: string, countryCode?:string): string {
    //Si no se proporciona un número de telEfono o cOdigo de país, simplemente devuelve el nUmero sin modificaciones.
    if(!numeroTelefonico || !countryCode) return numeroTelefonico;
    //Convierte el cOdigo del paIs en mayUsculas para evitar problemas de formato.
    const code = this.countryCodes[countryCode.toUpperCase()] || '';

    //Si code tiene un valor válido, devuelve el numero con el código de pais concatenado.
    //Si code esta vacio, devuelve el numero sin modificaciones.
    return code ? `${code} ${numeroTelefonico}` : numeroTelefonico
  }

}
