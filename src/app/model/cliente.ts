import { Usuario } from './usuario';
import { Listado } from './listado';
import { Reseña } from './reseña';

export class Cliente extends Usuario{
    codigo: number;
    nombre: String;
    apellido: String;
    edad: number;
    distrito: String;
    listado: Listado;
    reseñas: Reseña[];
}
