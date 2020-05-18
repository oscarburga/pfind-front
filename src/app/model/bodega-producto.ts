import { Producto } from './producto';
import { Bodega } from './bodega';
import { Listado } from './listado';

export class BodegaProducto {
    codigo: number;
    precio: number;
    producto: Producto;
    bodega: Bodega;
    listado: Listado;
}