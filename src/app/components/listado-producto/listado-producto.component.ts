import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../service/cliente.service'
import { ListadoProducto} from '../../model/listado-producto'
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-listado-producto',
  templateUrl: './listado-producto.component.html',
  styleUrls: ['./listado-producto.component.css']
})
export class ListadoProductoComponent implements OnInit {
  costoTotal : number;
  listado_producto : ListadoProducto[];
  corazon: string = "fa fa-heart-o";
  corazoncss: string = "black";
  lp_eliminar: number;
  costo_total: number;
  listadoP: ListadoProducto;
  constructor(private clienteService:ClienteService, private authService:AuthService) { }

  ngOnInit(): void {
    this.clienteService.obtenerLP(this.authService.usuario.idEntity).subscribe(data =>{ 
      this.listado_producto = data;
      this.costo_total = 0;
      for(let i = 0; i<this.listado_producto.length; i++){
        console.log(i);
        this.costo_total += this.listado_producto[i].bodega_producto.precio;
      }

    });
  }

  eliminarLP(lp: ListadoProducto){
      console.log(lp.codigo);
      this.clienteService.eliminarLP(lp.codigo).subscribe(data =>{
        this.ngOnInit();
      });
      
  }

  costo(): any{
    this.costo_total = 0;
    console.log("quetal")
    return this.costo_total;
  }

}
