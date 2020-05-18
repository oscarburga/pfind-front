import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {

  producto : Producto = new Producto();
  constructor(private productoService : ProductoService) { }

  ngOnInit(): void {
  }

  save(){
    this.productoService.registrarProducto(this.producto).subscribe(data => console.log(data));
  }

}
