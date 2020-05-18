import { BodegaCategoria } from './bodega-categoria';
import { Producto } from './producto';

export class Categoria {
    codigo: number;
    nombre: String;
    bodega_categoria: BodegaCategoria[];
    producto: Producto[];
}
