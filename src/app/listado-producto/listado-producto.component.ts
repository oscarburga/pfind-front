import { Component, OnInit } from '@angular/core';
import { Producto} from '../model/producto';
import { BodegaProducto } from 'src/app/model/bodega-producto'
import { ClienteService } from 'src/app/cliente.service'
import { Observable } from 'rxjs';
import { Listado } from 'src/app/model/listado'


@Component({
  selector: 'app-listado-producto',
  templateUrl: './listado-producto.component.html',
  styleUrls: ['./listado-producto.component.css']
})
export class ListadoProductoComponent implements OnInit {
  costoTotal : number;
  lista_Productos :Observable<Listado[]>
  array: Listado[]
  constructor(private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.reloadData();
    this.loadPrecio()
    console.log(this.costoTotal)
  }

  reloadData(){
    console.log("RELOAD!")
    this.clienteService.enlistarProductos().subscribe(
      data => this.lista_Productos = data
    )
  }

  loadPrecio(){
    this.clienteService.obtenerPrecio().subscribe(data => this.costoTotal = data);
  }
}
