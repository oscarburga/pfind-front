import { Component, OnInit } from '@angular/core';
import { BodegaProducto } from '../model/bodega-producto';
import { BodegaService } from '../bodega.service';
import { Categoria } from '../model/categoria';
import { ProductoService } from '../producto.service';
import { Producto } from '../model/producto';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registrar-bodega-producto',
  templateUrl: './registrar-bodega-producto.component.html',
  styleUrls: ['./registrar-bodega-producto.component.css']
})
export class RegistrarBodegaProductoComponent implements OnInit {

  bid: number;
  pid: number;
  precio: number;
  categorias: Categoria[];
  categoriaID: number;
  productos: Producto[];
  buscandoProducto: FormGroup;

  constructor(
    private bodegaService : BodegaService, 
    private productoService: ProductoService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerCategoria()
    this.buscandoProducto = this.fb.group({
      optionControl: ['Elija una Categoria']
    });
  }
  
  save(){
    this.bodegaService.registrarBodegaProducto(this.bid, this.pid, this.precio).subscribe(data=> console.log(data));
  }
  
  obtenerCategoria(){
    this.bodegaService.obtenerCategoria().subscribe(data => {
        this.categorias = data;
      })
    }

  buscarProducto(){
    console.log(this.categoriaID)
    this.productoService.buscarPorCategoria(this.categoriaID).subscribe(
      data => {this.productos = data
      console.log(data)}
    )
  }


}
