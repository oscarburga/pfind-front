import { Listado } from './listado';
import { Reseña } from './reseña';

export class Cliente {
    codigo: number;
    nombre: String;
    apellido: String;
    edad: number;
    email: String;
    password: String;
    distrito: String;
    listado: Listado;
    reseñas: Reseña[];
}
