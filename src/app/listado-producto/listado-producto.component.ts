import { Component, OnInit } from '@angular/core';
import { Producto} from '../model/producto';
import { BodegaProducto } from 'src/app/model/bodega-producto'
import { ClienteService } from 'src/app/cliente.service'
import { Observable } from 'rxjs';
import { Listado } from 'src/app/model/listado'
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-listado-producto',
  templateUrl: './listado-producto.component.html',
  styleUrls: ['./listado-producto.component.css']
})
export class ListadoProductoComponent implements OnInit {
  costoTotal : number;
  lista_Productos :Observable<Listado[]>
  array: Listado[]
  corazon: string = "fa fa-heart-o";
  corazoncss: string = "black";

  constructor(private clienteService:ClienteService, private authService:AuthService) { }

  ngOnInit(): void {
    this.reloadData();
    this.loadPrecio()
    console.log(this.costoTotal)
  }

  reloadData(){
    console.log("RELOAD!")
    this.clienteService.enlistarProductos_logeado(this.authService.usuario.idEntity).subscribe(
      data => this.lista_Productos = data
    )
  }
/////////////
eliminardeLista(bt: number){
    this.corazon ="fa fa-heart";
    this.corazoncss = "red";
    //this.clienteService.eliminarproductobodega(bt).subscribe(
   //   data=> console.log("Agregado Exitosamente")
   // );
  }

  loadPrecio(){
    this.clienteService.obtenerPrecio().subscribe(data => this.costoTotal = data);
  }
}
