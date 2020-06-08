import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BodegaService } from '../bodega.service';
import { BodegaProducto } from '../model/bodega-producto';

@Component({
  selector: 'app-visualizar-producto',
  templateUrl: './visualizar-producto.component.html',
  styleUrls: ['./visualizar-producto.component.css']
})
export class VisualizarProductoComponent implements OnInit {
  bid: number;
  pid: number;
  bp: BodegaProducto;
  constructor(private bodegaService: BodegaService, private _ActivatedRoute : ActivatedRoute) { }
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params =>{
      this.bid = Number(params.get('bid'));
      this.pid = Number(params.get('pid'));
    })
    console.log(this.bid);
    console.log(this.pid);
    this.bodegaService.obtenerBP(this.bid, this.pid).subscribe(data => this.bp = data);
  }

}
