import { Component, OnInit, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, ChildActivationStart } from '@angular/router';
import { BodegaService } from '../bodega.service';
import { BodegaProducto } from '../model/bodega-producto';
import { MapsAPILoader, MouseEvent } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-visualizar-producto',
  templateUrl: './visualizar-producto.component.html',
  styleUrls: ['./visualizar-producto.component.css']
})
export class VisualizarProductoComponent implements AfterViewInit, OnInit {
  bpid: number;
  bp: BodegaProducto;
  map: any;
  marker: any;
  latitude: number;
  longitude: number;
  zoom: number = 15;
  address: string;
  results: any;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private bodegaService: BodegaService, private _ActivatedRoute : ActivatedRoute) { }
  
    ngOnInit(){
      this._ActivatedRoute.paramMap.subscribe(params =>{
        this.bpid = Number(params.get('id'));
      })
      this.obtener();
      this.bodegaService.obtenerBodegaProductoId(this.bpid).subscribe(data => this.bp = data);
    }

  ngAfterViewInit(): void {
    const DSLScript = document.createElement('script');
    DSLScript.src = 'https://maps.googleapis.com/maps/api/js?key=xxxxx'; // replace by your API key
    DSLScript.type = 'text/javascript';
    document.body.appendChild(DSLScript);
    document.body.removeChild(DSLScript);
  }

  crearmap(){
    this.latitude = -12.0463503;
    this.longitude = -77.0427589;
    var ini_place = {
      lat: this.latitude,
      lng: this.longitude}
    this.map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: ini_place });
    this.marker = new google.maps.Marker({position: ini_place, map: this.map});
  }

  obtener(){
   this.bodegaService.obtenerdeDireccion(this.address).subscribe(
     data => {
      console.log(data);
      this.results = data.results[0];
      this.latitude=this.results.geometry.location.lat;
      this.longitude=this.results.geometry.location.lng;
    }
   )
  }

}