import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from './model/producto';
import { BodegaProducto } from './model/bodega-producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlBase = "http://localhost:8080/producto";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  

  buscarPorCategoria(cid: number) : Observable<Producto[]>{
    return this.http.get(this.urlBase+ "/buscarCtg/" + cid.toString()).pipe(map(response => response as Producto[]))
  }

  obtenerProducto(id: number): Observable<Object>{
    return this.http.get(this.urlBase+"/buscar/"+ id.toString()).pipe(map(response => response as Producto))
  }

  registrarProducto(p: Producto, cid: number) : Observable<Object>{
    return this.http.post(this.urlBase+"/registrar/" + cid.toString(), p, { headers: this.httpHeaders});
  }

}
