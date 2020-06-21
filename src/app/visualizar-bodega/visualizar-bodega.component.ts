import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BodegaService } from '../bodega.service';
import { Bodega } from '../model/bodega';
import { BodegaProducto } from '../model/bodega-producto';
import { Resena } from '../model/resena';
@Component({
  selector: 'app-visualizar-bodega',
  templateUrl: './visualizar-bodega.component.html',
  styleUrls: ['./visualizar-bodega.component.css']
})
export class VisualizarBodegaComponent implements OnInit {
  bid: number;
  bod: Bodega;
  re: Resena = new Resena();
  constructor(private bodegaService: BodegaService, private _ActivatedRoute : ActivatedRoute) { }
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params =>{
      this.bid = Number(params.get('bid'));
    })
    console.log(this.bid);
    this.bodegaService.buscarBodega(this.bid).subscribe(data => console.log(this.bod = data));
    this.re.bodega = this.bod;
  }
  save(): void{
    console.log(this.re.calificacion);
    this.bodegaService.crearResena(this.re, this.bod.codigo, 1).subscribe(data=> console.log(data));
  }
}
