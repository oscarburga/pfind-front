import { Component, OnInit, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, ChildActivationStart } from '@angular/router';
import { BodegaService } from '../bodega.service';
import { BodegaProducto } from '../model/bodega-producto';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { environment } from 'src/environments/environment';

import * as mapboxgl from 'mapbox-gl';
import { Bodega } from '../model/bodega';

@Component({
  selector: 'app-visualizar-producto',
  templateUrl: './visualizar-producto.component.html',
  styleUrls: ['./visualizar-producto.component.css']
})
export class VisualizarProductoComponent implements OnInit {
  bpid: number;
  bp: BodegaProducto;
  bodega: Bodega;
  results: any;
  tresena: number;
  cantr: number;
  mapa3: mapboxgl.Map;
  latitud: number;
  longitud: number;
  address: string;
  bod: Bodega;
  marker: mapboxgl.Marker;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private bodegaService: BodegaService, private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.bpid = Number(params.get('id'));
    })
    this.bodegaService.obtenerBodegaProductoId(this.bpid).subscribe(data => {
      this.bp = data
      this.bodega = this.bp.bodega
      this.cambioDireccion(this.bodega.direccion)
      this.bodegaService.buscarBodega(this.bodega.codigo).subscribe(data =>{
        this.bod = data
        this.calcularR();
      } );
    });

    

    (mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa3 = new mapboxgl.Map({
      container: 'mapa3', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 9 // starting zoom
    });
    this.marker = new mapboxgl.Marker({
      draggable: false
    })
    
  }

  crearmarcador(lng: number, lat: number) {
    this.mapa3.setCenter([lng,lat]);
    this.marker.setLngLat([lng, lat]).addTo(this.mapa3);
  }

  cambioDireccion(value: string) { 
    this.address =value;
    this.obtenerMarcador();
  }

  obtenerMarcador(){
    this.bodegaService.obtenerdeDireccion(this.bodega.direccion).subscribe(
      data => {
        console.log(data);
        if(data.results.length != 0){
          this.latitud = data.results[0].geometry.location.lat;
          this.longitud = data.results[0].geometry.location.lng;
          this.crearmarcador(this.longitud, this.latitud);
        }
      }
    )
  }
  calcularR(): any{

    this.bodegaService.buscarBodega(this.bodega.codigo).subscribe(data =>{
      console.log(this.bod = data)
      this.cambioDireccion(this.bod.direccion)
    } );

    this.tresena = 0;
    this.cantr = 0;
    for(let i of this.bod.resena){
      this.tresena = this.tresena + i.calificacion;
      this.cantr = this.cantr+1;
    }
    this.tresena = this.tresena / this.cantr;
    this.tresena = Math.round(this.tresena * 100) /100;
    console.log("mi cali es " + this.tresena);
    
    return this.tresena;
  } 
}