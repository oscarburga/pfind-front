import { Component, OnInit, Input } from '@angular/core';
import { BodegaService } from '../../service/bodega.service';
import { Router } from '@angular/router';
import { Bodega } from '../../model/bodega';
import { Categoria } from '../../model/categoria';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-registar-bodega',
  templateUrl: './registar-bodega.component.html',
  styleUrls: ['./registar-bodega.component.css']
})
export class RegistarBodegaComponent implements OnInit {

  bodega = new Bodega()
  cat: Observable<Categoria[]>
  //mapa
  mapa: mapboxgl.Map;
  latitud: number;
  longitud: number;
  address: string="";
  marker :mapboxgl.Marker;
  box: Input;
  //cargar imagenes
  fileName: String;
  label_imagen : String = "Elige una imagen";
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

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
    this.bodegaService.registrarBodega(this.bodega).subscribe(data => {
      const uploadImageData = new FormData();
      console.log(this.selectedFile);
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.bodegaService.subirImagen(uploadImageData);
      this.router.navigate(["/loginBodega"]);}
    );
  }

  getCategoria(){
    this.bodegaService.obtenerCategoria().subscribe(
      data => this.cat = data
    );
  }

  cambioDireccion(value: string) { 
    this.address =value;
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

  onFileSelected(event){
    var file = event.target.files[0];
    console.log(file)
    if (file.size < 1048576) {
      this.fileName = file.name;
      this.selectedFile = file;
      if(this.fileName.length < 30){
        this.label_imagen = this.fileName;
      }else{
        if(this.fileName.length > 50){
          this.label_imagen = "Imagen seleccionada"
        }
      }
    }else{
      file = []
      this.label_imagen ="Imagen muy grande";
      swal.fire('Error', `Imagen muy grande!`, 'error');
    }
  }
}
