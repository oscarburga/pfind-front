import { BodegaProducto } from './bodega-producto';
import { Cliente } from './cliente';

export class Listado {
    codigo: number;
    cliente: Cliente;
    cantidad: number;
    precio_total: number;
    bodega_producto: BodegaProducto[];
}
