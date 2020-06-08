import { Categoria } from './categoria';
import { BodegaProducto } from './bodega-producto';

export class Producto {
    codigo: number;
    nombre: string;
    marca: string;
    imagenprin: string;
    categoria: Categoria;
    bodega_productos: BodegaProducto[];
}
