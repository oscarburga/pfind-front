import { Component, OnInit } from '@angular/core';
import { Producto } from '../model/producto';
import { Observable } from 'rxjs';
import { ProductoService } from '../producto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  productos: Observable<Producto[]>;
  nombre: string
  constructor(private productoService : ProductoService, private _Activatedroute:ActivatedRoute) {}

  ngOnInit(): void {
    this.buscarPorNombre();
  }
  buscarPorNombre(){
    this.nombre=this._Activatedroute.snapshot.paramMap.get("nombre");
    this.productoService.listarProductos(this.nombre).subscribe(
      data => this.productos = data
    )
  }
}
