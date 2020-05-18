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
  cid: number = 1;
  constructor(private productoService : ProductoService) { }

  ngOnInit(): void {
  }

  save(){
    this.productoService.registrarProducto(this.producto, this.cid).subscribe(data => console.log(data));
  }

}
