import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, ChildActivationStart } from '@angular/router';
import { BodegaService } from '../bodega.service';
import { BodegaProducto } from '../model/bodega-producto';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-visualizar-producto',
  templateUrl: './visualizar-producto.component.html',
  styleUrls: ['./visualizar-producto.component.css']
})
export class VisualizarProductoComponent implements OnInit {
  bpid: number;
  bp: BodegaProducto;
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;
  adress1: string = "2564+Oscar+R.+Benavides+Lima,+Peru"
  results: any;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private bodegaService: BodegaService, private _ActivatedRoute : ActivatedRoute) { }
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params =>{
      this.bpid = Number(params.get('id'));
    })
    this.obtener();
    console.log(this.bpid);
    this.bodegaService.obtenerBodegaProductoId(this.bpid).subscribe(data => this.bp = data);
  }

  obtener(){
    this.results = this.bodegaService.obtenerDireccion(this.adress1);
    console.log(this.results);
  }

}