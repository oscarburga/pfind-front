import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from './model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlBase = "http://localhost:8080/producto";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  listarProductos(nombre: String) : Observable<any>{
    return this.http.get(this.urlBase+"/listar/"+nombre).pipe(map(response => response as Producto[]));
  }

  registrarProducto(p: Producto) : Observable<Object>{
    return this.http.post(this.urlBase+"/registrar", p, { headers: this.httpHeaders});
  }
}
