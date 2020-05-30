import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from './model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlBase = "http://localhost:8080/cliente";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  registrarCliente(cliente: Cliente): Observable<Object>{
    return this.http.post(this.urlBase+"/registrar", cliente, {headers: this.httpHeaders});
  }

  
  
}
