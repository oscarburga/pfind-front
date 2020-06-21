import { Listado } from './listado';
import { Resena } from './resena';

export class Cliente {
    codigo: number;
    nombre: String;
    apellido: String;
    edad: number;
    email: String;
    password: String;
    distrito: String;
    listado: Listado;
    resenas: Resena[];
    imagen: any;
}
