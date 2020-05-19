import { Component, OnInit } from '@angular/core';
import { Producto } from '../model/producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute } from '@angular/router';
import { BodegaService } from '../bodega.service';
import { BodegaProducto } from '../model/bodega-producto';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';


@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  bodegaProducto: BodegaProducto[];
  param: string;
  tipo: number;
  cat: Categoria[];
  nombre:string;
  catg:number;

  constructor(private bodegaService:BodegaService, private _Activatedroute: ActivatedRoute ) { }


  ngOnInit(): void {
    this.bodegaService.obtenerCategoria().subscribe(data => this.cat = data);
    this.param=this._Activatedroute.snapshot.paramMap.get("param");
    this.tipo = Number(this._Activatedroute.snapshot.paramMap.get("tipo"));
    if (this.tipo == 1) {
      this.nombre = this.param;
      this.buscarPorNombre();
    }
    else{
      this.nombre = "";
      this.catg = Number(this.param);
      this.buscarPorCategoria();
    }
      console.log(this.bodegaProducto)
  }
  buscarMixto(){
    console.log("Buscando", this.catg, ", ", this.nombre)
    this.bodegaService.buscarCategoriaProducto(this.catg, this.nombre).subscribe(data => this.bodegaProducto = data);
  }
  buscarPorNombre(){
    this.bodegaService.obtenerBodegaProducto(this.param).subscribe(
      data => this.bodegaProducto = data
    );
  }
  buscarPorCategoria(){
    this.bodegaService.buscarCategoria(Number(this.param)).subscribe(
      data => this.bodegaProducto = data
    );
  }
}
