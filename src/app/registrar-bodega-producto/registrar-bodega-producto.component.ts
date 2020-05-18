import { Component, OnInit } from '@angular/core';
import { BodegaProducto } from '../model/bodega-producto';
import { BodegaService } from '../bodega.service';
import { ProductoService } from '../producto.service';
import { Bodega } from '../model/bodega';
import { Producto } from '../model/producto';
import { Listado } from '../model/listado';

@Component({
  selector: 'app-registrar-bodega-producto',
  templateUrl: './registrar-bodega-producto.component.html',
  styleUrls: ['./registrar-bodega-producto.component.css']
})
export class RegistrarBodegaProductoComponent implements OnInit {

  bid: number;
  pid: number;
  precio: number;
  constructor(private bodegaService : BodegaService) { }

  ngOnInit(): void {

  }
  
  save(){
    console.log(this.bodegaService.registrarBodegaProducto(this.bid, this.pid, this.precio));
  }

}
