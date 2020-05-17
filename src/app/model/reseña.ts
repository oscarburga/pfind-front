import { Cliente } from './cliente';
import { Bodega } from './bodega';

export class Reseña {
    codigo: number;
    contenido: String;
    calificacion: number;
    cliente: Cliente;
    bodega: Bodega;
}
