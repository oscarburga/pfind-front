import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BodegaService } from '../bodega.service';
import { BodegaProducto } from '../model/bodega-producto';
import { Categoria } from '../model/categoria';
import { ClienteService } from '../cliente.service';
import { Observable } from 'rxjs';
import { Bodega } from '../model/bodega';
import { ListadoProducto} from '../model/listado-producto'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  bodegaProducto: BodegaProducto[] = this.bodegaService.descargarData();

  x: number = 0;
  counter= Array;
  cantidad: number = Math.round(2.2);
  param: string;
  tipo: number; 
  pmin: number;
  pmax: number;
  nombre_bodega:string;
  nombre_marca:string;
  cat: Categoria[];
  nombre:string;
  catg:number = 0;
  filmarca:string[];
  filbodega:string[];
  agregado_id:number;
  corazon: string = "fa fa-heart-o";
  corazoncss: string = "black";
  bpid_reg: number;
  lis : any;
  constructor(private bodegaService:BodegaService, private _Activatedroute: ActivatedRoute, private  clienteService: ClienteService, private authService: AuthService) { }

  ngOnInit(): void {
  this.cargarCategora()
  }

  ngOnDestroy(): void{
    this.bodegaProducto
  }
  //######## USANDO ACTUALMENTE ###############################################################
  descargarData(){
    return this.bodegaService.descargarData();  
  }

  obtenerImagen(bp:BodegaProducto){
    return this.bodegaService.getImageProucto(bp)
  }

  actualizarDatos(){
    return this.bodegaService.buscarCompleto(null, this.nombre_marca, this.nombre_bodega, this.pmin, this.pmax, 0);
  }
//######## USANDO ACTUALMENTE ###############################################################

  mostrarfiltros(){
    if(this.bodegaProducto.length != 0){
      let filtros = [];
      for(var i = 0;i < this.bodegaProducto.length ;i++ ){
        if(!(filtros.includes(this.bodegaProducto[i].bodega.nombre))){
          filtros.push(this.bodegaProducto[i].bodega.nombre);
        }
      }
    }
  }

  isCliente(){
    return this.authService.hasRole("ROLE_CLIENTE");
  }
  
  registrarLP(bpid: number){ 
    this.corazon ="fa fa-heart";
    this.corazoncss = "red";
    console.log(bpid);
    this.clienteService.registrarLP(this.authService.usuario.idEntity, bpid).subscribe(
      data=> console.log("Agregado Exitosamente")
    );
  }

  cargarCategora(){
    this.bodegaService.obtenerCategoria().subscribe(
      data => this.cat = data
    )
  }
}
