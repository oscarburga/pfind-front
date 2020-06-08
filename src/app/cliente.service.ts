import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from './model/cliente';
import { Listado } from './model/listado';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlBase = "http://localhost:8762/cliente";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  

  Cliente_id: number = 11;

  constructor(private http: HttpClient) { }

  registrarCliente(cliente: Cliente): Observable<Object>{
    return this.http.post(this.urlBase+"/registrar", cliente, {headers: this.httpHeaders});
  }

  listarProductos(bp:number) : Observable<any>{
    return this.http.post(this.urlBase + "/" + this.Cliente_id + "/enlistar/" + bp, {headers: this.httpHeaders});
    }

  enlistarProductos(): Observable<any>{
    return this.http.get(this.urlBase + "/" + this.Cliente_id + "/lista").pipe(
      map(response => response as Listado[])
    )
  }
  
}
