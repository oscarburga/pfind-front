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
  param: string;
  tipo:number;

  constructor(private bodegaService:BodegaService, private _Activatedroute: ActivatedRoute ) { }


  ngOnInit(): void {
    this.param=this._Activatedroute.snapshot.paramMap.get("param");
    this.tipo = Number(this._Activatedroute.snapshot.paramMap.get("tipo"));
    this.buscar();
    console.log(this.bodegaProducto)
  }
  buscar(){
    if (this.tipo == 1) this.buscarPorNombre();
    else this.buscarPorCategoria();
  }
  buscarPorNombre(){
    this.bodegaService.obtenerBodegaProducto(this.param).subscribe(
      data => this.bodegaProducto = data
    );
  }
  buscarPorCategoria(){
    console.log("Pendejada")
    this.bodegaService.buscarCategoria(Number(this.param)).subscribe(
      data => this.bodegaProducto = data
    );
  }
}
