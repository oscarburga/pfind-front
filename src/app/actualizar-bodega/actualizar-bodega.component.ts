import { Component, OnInit } from '@angular/core';
import { BodegaService } from '../bodega.service';
import { Router } from '@angular/router';
import { Bodega } from '../model/bodega';
import { Categoria } from '../model/categoria';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-actualizar-bodega',
  templateUrl: './actualizar-bodega.component.html',
  styleUrls: ['./actualizar-bodega.component.css']
})
export class ActualizarBodegaComponent implements OnInit {

  bID : number;
  bodega: Bodega = new Bodega();
  cat: Observable<Categoria[]>;

  constructor(private bodegaService:BodegaService, private router:Router) { }

  ngOnInit(): void {
    this.getCategoria();
  }

  getBodega(){
    this.bodegaService.buscarBodega(this.bID).subscribe(data => this.bodega = data);
  }


  save(){
    this.bodegaService.actualizarBodega(this.bodega).subscribe(
      data => this.router.navigate(["/inicio"])
    );
  }

  getCategoria(){
    this.bodegaService.obtenerCategoria().subscribe(
      data => this.cat = data
    );
  }

}
