import { Cliente } from './cliente';
import { Bodega } from './bodega';

export class Resena {
    codigo: number;
    contenido: String;
    calificacion: number;
    cliente: Cliente;
    bodega: Bodega;
}
