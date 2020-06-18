import { Component, OnInit } from '@angular/core';
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

  constructor(private bodegaService:BodegaService, private router:Router) { }

  ngOnInit(): void {
    this.getCategoria();
    mapboxgl.accessToken = environment.mapboxKey;
    this.mapa = new mapboxgl.Map({
      container: 'mapa', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // starting position
      zoom: 9 // starting zoom
    });

    this.crearmarcador(-74.5, 40);
  }

  crearmarcador(lng: number, lat: number) {
    const marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
    
    marker.on('drag',()=>{
      this.longitud = marker.getLngLat().lng;
      console.log(this.longitud)
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

}
