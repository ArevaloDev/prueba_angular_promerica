export interface Usuarios {
  id:         number;
  first_name: string;
  last_name:  string;
  country:    string;
  email:      string;
  phone:      string;
  gender:     Genero;
  website:    string;
  created_at: Date;
  updated_at: Date;
  flagUrl:string;
  avatarUrl:string;
  nacionalidad:string;
}

export enum Genero {
  Female = "female",
  Male = "male",
}
