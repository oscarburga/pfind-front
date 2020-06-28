import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import {Auspiciador} from './model/auspiciador';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuspiciadorService {
  private urlBase = "http://localhost:8762/auspiciador";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) { }

  registrarAuspiciador(auspiciador: Auspiciador): Observable<Object>{
    return this.http.post(this.urlBase+"/registrar", auspiciador, {headers: this.httpHeaders});
  }

  obtenerAuspiciadores(): Observable<any>{
    
    return this.http.get(this.urlBase+"/obtener").pipe(
      map(response => response as Auspiciador[])
    )
  }

}
