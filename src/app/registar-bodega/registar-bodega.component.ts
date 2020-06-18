import { Component, OnInit, Input } from '@angular/core';
import { BodegaService } from '../bodega.service';
import { Router } from '@angular/router';
import { Bodega } from '../model/bodega';
import { Categoria } from '../model/categoria';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-registar-bodega',
  templateUrl: './registar-bodega.component.html',
  styleUrls: ['./registar-bodega.component.css']
})
export class RegistarBodegaComponent implements OnInit {

  bodega = new Bodega()
  cat: Observable<Categoria[]>
  mapa: mapboxgl.Map;
  latitud: number;
  longitud: number;
  address: string="";
  n_address:string = "";
  marker :mapboxgl.Marker;
  box: Input;

  constructor(private bodegaService:BodegaService, private router:Router) { }

  ngOnInit(): void {
    this.getCategoria();
    (mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new mapboxgl.Map({
      container: 'mapa', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-77.0427589,-12.0463503], // starting position
      zoom: 9 // starting zoom
    });
    this.marker = new mapboxgl.Marker({
      draggable: true
    })
    this.crearmarcador(-77.0427589,-12.0463503);
    this.moverMarcador(this.longitud, this.latitud);
  }

  crearmarcador(lng: number, lat: number) {
    this.mapa.setCenter([lng,lat]);
    this.marker.setLngLat([lng, lat]).addTo(this.mapa);
  }

  moverMarcador(lng:number, lat: number){
    this.marker.on('drag',()=>{
      this.longitud = this.marker.getLngLat().lng;
      this.latitud = this.marker.getLngLat().lat;
      this.obtenerDireccionLngLat();
    })
  }

  save(){
    this.bodegaService.registrarBodega(this.bodega).subscribe(
      data => this.router.navigate(["/inicio"])
    );
  }

  getCategoria(){
    this.bodegaService.obtenerCategoria().subscribe(
      data => this.cat = data
    );
  }

  cambioDireccion(value: string) { 
    this.address = this.n_address+value;
    this.obtenerMarcador();
  }

  obtenerMarcador(){
    this.bodegaService.obtenerdeDireccion(this.address).subscribe(
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

  obtenerDireccionLngLat(){
    this.bodegaService.obtenerdeLngLat(this.latitud,this.longitud).subscribe(
      data => {
        console.log(data);
        if(data.results.length != 0){
          this.address = data.results[0].formatted_address;
        }
      }
    )
  }
}
