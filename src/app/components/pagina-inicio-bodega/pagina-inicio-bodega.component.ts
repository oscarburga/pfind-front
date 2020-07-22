import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute,  Router } from '@angular/router';
import { BodegaService } from '../../service/bodega.service';
import { Bodega } from '../../model/bodega';
import { Resena} from '../../model/resena';

import * as mapboxgl from 'mapbox-gl';
import { AuthService } from '../../service/auth.service';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagina-inicio-bodega',
  templateUrl: './pagina-inicio-bodega.component.html',
  styleUrls: ['./pagina-inicio-bodega.component.css']
})
export class PaginaInicioBodegaComponent implements OnInit {
  
  bodega: Bodega;
  res: Resena[];

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  //map
  mapa2: mapboxgl.Map;
  latitud: number;
  longitud: number;
  address: string;
  marker :mapboxgl.Marker;
  Nombre: String;
  imagen: String;
  direccion: String;
  aforo: number;
  resena: Resena[];
  constructor(
    private bodegaService: BodegaService, 
    private _ActivatedRoute : ActivatedRoute, 
    private authService : AuthService, 
    private router: Router
    ) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean {
    if (e.status == 401) {

      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/clientes']);
      return true;
    }
    return false;
  }


  ngOnInit(): void {
    this.bodegaService.buscarBodega(this.authService.usuario.idEntity).subscribe(
      data => {
        this.bodega = data;
        this.Nombre = this.bodega.nombre;
        this.imagen = "data:image/jpeg;base64," + this.bodega.imagen;
        this.direccion = this.bodega.direccion;
        this.aforo = this.bodega.aforo;
        this.resena = this.bodega.resena;
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
        if(data.results.length != 0){
          this.address = data.results[0].formatted_address;
        }
      }
    )
  }
}
