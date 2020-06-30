import { Component, OnInit } from '@angular/core';
import { BodegaService } from '../bodega.service';
import { Router } from '@angular/router';
import { Bodega } from '../model/bodega';
import { Categoria } from '../model/categoria';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-actualizar-bodega',
  templateUrl: './actualizar-bodega.component.html',
  styleUrls: ['./actualizar-bodega.component.css']
})
export class ActualizarBodegaComponent implements OnInit {

  bID : number;
  bodega: Bodega;
  cat: Observable<Categoria[]>;

  constructor(private bodegaService:BodegaService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getCategoria();
    this.bodegaService.buscarBodega(this.authService.usuario.idEntity).subscribe(data => this.bodega = data);
  }

  save(){
    console.log(this.bodega);
    this.bodega.productos = null;
    this.bodegaService.actualizarBodega(this.bodega).subscribe(
      data => this.router.navigate(["/inicioBodega"])
    );
  }

  getCategoria(){
    this.bodegaService.obtenerCategoria().subscribe(
      data => this.cat = data
    );
  }

}
