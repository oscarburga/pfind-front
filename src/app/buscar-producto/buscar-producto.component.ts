import { Component, OnInit } from '@angular/core';
import { Producto } from '../model/producto';
import { Observable } from 'rxjs';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  productos: Producto[];
  nombre : String = "";
  categoria: number = 0;
  constructor(private productoService : ProductoService ) { }

  ngOnInit(): void {
  }
  buscar(){
    if (this.categoria != 0) this.buscarPorCategoria();
    else this.buscarPorNombre();
  }
  buscarPorNombre(){
    this.productoService.listarProductos(this.nombre).subscribe(productos => this.productos = productos);
  }
  buscarPorCategoria(){
    this.productoService.buscarPorCategoria(this.categoria).subscribe(productos => this.productos = productos);
  }
}
