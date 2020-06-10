import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BodegaService } from 'src/app/bodega.service';
import { Categoria } from 'src/app/model/categoria';
import { ProductoService } from 'src/app/producto.service';
import { strict } from 'assert';
import { partitionArray } from '@angular/compiler/src/util';
import { BodegaProducto } from './model/bodega-producto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pfind';
  busqueda:string;
  logoInicio =  'https://cdn.discordapp.com/attachments/700237020278030396/714972834518270052/online-shopping.png'
  cat: Categoria[];
  desplegarmenu : Boolean = false;
  
  constructor(private router: Router, private bodegaServicio: BodegaService, private productoservicio : ProductoService){}

  ngOnInit(): void {
    this.obtenerCategoria();
    this.router.navigate(["inicio"]);
  }

  isRClienteRoute(){
    return !(this.router.url =='/loginCliente' || this.router.url == '/loginBodega');

  }
//######## USANDO ACTUALMENTE BUSQUEDA ###############################################################
  buscarNombre(){
     this.bodegaServicio.obtenerp(this.busqueda)
     this.router.navigate(['/buscarProducto'])
  }

  buscarCategoria(id_codigo: number){
    this.bodegaServicio.buscarCategoria(id_codigo)
    this.router.navigate(['/buscarProducto'])
  }
  //######## USANDO ACTUALMENTE BUSQUEDA ###############################################################

  obtenerCategoria(): void{
    this.bodegaServicio.obtenerCategoria().subscribe(
      data => this.cat = data
    )
  }

  desplegar(): Boolean{
    if(this.desplegarmenu){
      this.desplegarmenu = false;
    }
    else this.desplegarmenu = true;
    return this.desplegarmenu;
  }

}

