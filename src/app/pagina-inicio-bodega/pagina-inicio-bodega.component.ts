import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ActivatedRoute, ChildActivationStart } from '@angular/router';
import { BodegaService } from '../bodega.service';
import { Bodega } from '../model/bodega';
import { Resena} from '../model/resena';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-pagina-inicio-bodega',
  templateUrl: './pagina-inicio-bodega.component.html',
  styleUrls: ['./pagina-inicio-bodega.component.css']
})
export class PaginaInicioBodegaComponent implements OnInit {
  
  bodega: Bodega;
  res: Resena[];

  //map
  mapa2: mapboxgl.Map;
  latitud: number;
  longitud: number;
  address: string;
  marker :mapboxgl.Marker;
  constructor(private bodegaService: BodegaService, private _ActivatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.bodegaService.buscarBodega(1).subscribe(
      data => {
        this.bodega = data
        this.cambioDireccion(this.bodega.direccion)
      }
    );
    
    (mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa2 = new mapboxgl.Map({
      container: 'mapa2', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 13 // starting zoom
    });
    this.marker = new mapboxgl.Marker({
      draggable: false
    })

  }

  crearmarcador(lng: number, lat: number) {
    this.mapa2.setCenter([lng,lat]);
    this.marker.setLngLat([lng, lat]).addTo(this.mapa2);
  }

  moverMarcador(lng:number, lat: number){
    this.marker.on('drag',()=>{
      this.longitud = this.marker.getLngLat().lng;
      this.latitud = this.marker.getLngLat().lat;
      this.obtenerDireccionLngLat();
    })
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
