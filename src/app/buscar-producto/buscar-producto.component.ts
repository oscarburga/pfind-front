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

  productos: Observable<Producto[]>;
  nombre : String = "";
  constructor(private productoService : ProductoService ) { }

  ngOnInit(): void {
  }
  buscarPorNombre(){
    this.productoService.listarProductos(this.nombre).subscribe(productos => this.productos = productos);
  }
}
