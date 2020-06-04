import { Component, OnInit } from '@angular/core';
import { Producto} from '../model/producto';
import { Bodega} from '../model/bodega';
import { Observable } from 'rxjs';
import { ProductoService } from 'src/app/producto.service';

@Component({
  selector: 'app-listado-producto',
  templateUrl: './listado-producto.component.html',
  styleUrls: ['./listado-producto.component.css']
})
export class ListadoProductoComponent implements OnInit {
  products: Observable<Producto>
  bodegas: Observable<Bodega>
  fDescription : String
  price : number
  image : string
  direccion : string
  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(){
    console.log("RELOAD!")
    /*this.productoService.listadoCliente().subscribe(products => this.products = products);*/
    /*this.productoService.listadoBodegas().subscribe(bodegas => this.bodegas = bodegas);*/
  }
}
