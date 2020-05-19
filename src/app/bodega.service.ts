import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Bodega } from './model/bodega';
import { Categoria } from './model/categoria';
import { BodegaProducto } from './model/bodega-producto';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {
  private urlBase = "http://localhost:8080/bodega";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  registrarBodega(bodega:Bodega){
    return this.http.post(this.urlBase + "/registrar", bodega, {headers: this.httpHeaders})
  }

  obtenerCategoria() : Observable<any>{
    return this.http.get("http://localhost:8080/categoria/obtener").pipe(
      map(response => response as Categoria[])
    )
  }

  registrarBodegaProducto(bid: number, pid:number, precio:number) : Observable<Object>{
    return this.http.post(this.urlBase + "/producto/" + bid.toString() + "/" + pid.toString() + "/" + precio.toString(), {headers: this.httpHeaders});
  }

  obtenerBodegaProducto(nombre: string) : Observable<any>{
    return this.http.get(this.urlBase + "/producto/buscarBPn/" + nombre).pipe(
      map(response => response as BodegaProducto[])
    )
  }

  buscarCategoria(id:number) : Observable<any>{
    return this.http.get(this.urlBase + "/producto/buscarBPCtg/" + id).pipe(
      map(response => response as BodegaProducto[])
    )
  }

  buscarCategoriaProducto(id:number, nombre:string) :Observable<any>{
    return this.http.get(this.urlBase + "producto/buscarBPCtgNombre/" + id + "/" + nombre).pipe(
      map(response => response as BodegaProducto[])
    )
  }

}
