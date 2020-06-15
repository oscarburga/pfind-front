import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationStart } from '@angular/router';
import { BodegaService } from '../bodega.service';
import { BodegaProducto } from '../model/bodega-producto';

@Component({
  selector: 'app-visualizar-producto',
  templateUrl: './visualizar-producto.component.html',
  styleUrls: ['./visualizar-producto.component.css']
})
export class VisualizarProductoComponent implements OnInit {
  bpid: number;
  bp: BodegaProducto;
  constructor(private bodegaService: BodegaService, private _ActivatedRoute : ActivatedRoute) { }
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params =>{
      this.bpid = Number(params.get('id'));
    })
    console.log(this.bpid);
    this.bodegaService.obtenerBodegaProductoId(this.bpid).subscribe(data => this.bp = data);
  }

}
