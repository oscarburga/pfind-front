import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BodegaService } from 'src/app/bodega.service';
import { Categoria } from 'src/app/model/categoria';
import { ProductoService } from 'src/app/producto.service';
import { strict } from 'assert';
import { partitionArray } from '@angular/compiler/src/util';

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
  isLogin : Boolean;
  
  constructor(private router: Router, private bodegaServicio: BodegaService, private productoservicio : ProductoService){}

  ngOnInit(): void {
    this.obtenerCategoria();
    this.router.navigate(["inicio"]);
  }

  marginImg(){
    if(this.router.url != '/loginUsuario'){
      return "margin-top: -10px;";
    }else{
      return "margin-top: 0;";
    }
  }

  isRClienteRoute(){
    this.isLogin = this.router.url != '/loginUsuario';
    return this.isLogin;
  }

  buscar():void{
    this.router.navigate(["/buscarProducto/1/" + this.busqueda]);
  }

  obtenerCategoria(): void{
    this.bodegaServicio.obtenerCategoria().subscribe(
      data => this.cat = data
    )
  }
}

