import { Component, OnInit } from '@angular/core';
import { Producto } from '../model/producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  productos: Producto[];
  nombre : String = "";
  categoria: number = 0;
  constructor(private productoService : ProductoService, private _Activatedroute: ActivatedRoute ) { }

  update(){
    this.categoria = Number(this._Activatedroute.snapshot.paramMap.get("cid"));
  }
  ngOnInit(): void {
    this.buscar();
  }
  buscar(){
    this.update();
    if (this.categoria != 0) this.buscarPorCategoria();
    else this.buscarPorNombre();
  }
  buscarPorNombre(){
    this.nombre=this._Activatedroute.snapshot.paramMap.get("nombre");
    this.productoService.listarProductos(this.nombre).subscribe(
      data => this.productos = data
    )
  }
  buscarPorCategoria(){
    this.productoService.buscarPorCategoria(this.categoria).subscribe(productos => this.productos = productos);
  }
}
