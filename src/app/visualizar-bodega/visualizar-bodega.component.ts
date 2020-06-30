import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BodegaService } from '../bodega.service';
import { Bodega } from '../model/bodega';
import { BodegaProducto } from '../model/bodega-producto';
import { Resena } from '../model/resena';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-visualizar-bodega',
  templateUrl: './visualizar-bodega.component.html',
  styleUrls: ['./visualizar-bodega.component.css']
})
export class VisualizarBodegaComponent implements OnInit {
  bid: number;
  bod: Bodega;
  re: Resena = new Resena();
  resenas: Resena[]

  mapa: mapboxgl.Map;
  latitud: number;
  longitud: number;
  address: string;
  marker: mapboxgl.Marker;
  constructor(private bodegaService: BodegaService, private _ActivatedRoute : ActivatedRoute) { }
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params =>{
      this.bid = Number(params.get('bid'));
    })
    console.log(this.bid);
    this.bodegaService.buscarBodega(this.bid).subscribe(data =>{
      console.log(this.bod = data)
      this.cambioDireccion(this.bod.direccion)
    } );
    this.re.bodega = this.bod;
    (mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new mapboxgl.Map({
      container: 'mapa', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 13 // starting zoom
    });
    this.marker = new mapboxgl.Marker({
      draggable: false
    })
  }
  save(): void{
    console.log(this.re.calificacion);
    this.bodegaService.crearResena(this.re, this.bod.codigo, 1).subscribe(data=> console.log(data));
  }

  crearmarcador(lng: number, lat: number) {
    this.mapa.setCenter([lng,lat]);
    this.marker.setLngLat([lng, lat]).addTo(this.mapa);
  }

  cambioDireccion(value: string) { 
    this.address =value;
    this.obtenerMarcador();
  }

  obtenerMarcador(){
    this.bodegaService.obtenerdeDireccion(this.bod.direccion).subscribe(
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
  
}
