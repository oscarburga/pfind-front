import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlBase = "http://localhost:8080/producto";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor() { }
}
