import { Component, OnInit } from '@angular/core';
import { Producto } from '../model/producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute } from '@angular/router';
import { BodegaService } from '../bodega.service';
import { BodegaProducto } from '../model/bodega-producto';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  bodegaProducto: BodegaProducto[];
  nombre : string = "";
  categoria: number = 0;

  constructor(private bodegaService:BodegaService, private _Activatedroute: ActivatedRoute ) { }


  ngOnInit(): void {
    this.nombre=this._Activatedroute.snapshot.paramMap.get("nombre");
    this.buscarPorNombre();
    console.log(this.bodegaProducto)
  }
  buscar(){
    if (this.categoria != 0) this.buscarPorCategoria();
    else this.buscarPorNombre();
  }
  buscarPorNombre(){
    this.bodegaService.obtenerBodegaProducto(this.nombre).subscribe(
      data => this.bodegaProducto = data
    );
  }
  buscarPorCategoria(){
    this.bodegaService.buscarCategoria(this.categoria);
  }
}
