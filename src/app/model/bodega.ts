import { BodegaCategoria } from './bodega-categoria';
import { BodegaProducto } from './bodega-producto';
import { Resena } from './resena';

export class Bodega{
    codigo: number;
    ruc: string;
    nombre: string;
    jefe: string;
    direccion: string;
    email: String;
    password: String;
    aforo: number;
    agencia_bancaria: String;
    bodega_categoria: BodegaCategoria[];
    productos: BodegaProducto[];
    resena: Resena[];
}
