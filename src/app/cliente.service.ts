import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from './model/cliente';
import { Listado } from './model/listado';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlBase = "http://localhost:8080/cliente";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  retrievedResponse: any;
  retrievedImage: any;
  base64Data: any;
  Cliente_id: number = 1;
  Nombre: String;
  Apellido: String;

  constructor(private http: HttpClient) { }

  registrarCliente(cliente: Cliente): Observable<Object>{
    return this.http.post(this.urlBase+"/registrar", cliente, {headers: this.httpHeaders});
  }
  
  actualizarCliente(cliente: Cliente): Observable<Object>{
      return this.http.post(this.urlBase+"/actualizar/" + cliente.codigo, cliente, {headers: this.httpHeaders});
  }

  buscarCliente(id: number) : Observable<any>{
    return this.http.get(this.urlBase + "/buscarCliente/" + id.toString()).pipe(map(response=>response as Cliente));
  }

  subirImagen(id:number, imagenData:any){
    return this.http.post(this.urlBase + "/upload_imagen/" +id , imagenData, { observe: 'response' }).subscribe(
      (response) => {
        if(response.status === 200){
          console.log("Imagen cargada correctamente")
        this.getImage(id);
        }else{
          console.log("Imagen no cargada")
          }
        }
    )
  }

  getImage(Cid: number){
    this.http.get(this.urlBase + '/get_imagen/'+ Cid).subscribe(
        res => {
          this.retrievedResponse = res;
          this.Nombre = this.retrievedResponse.nombre;
          this.Apellido = this.retrievedResponse.apellido;
          this.base64Data = this.retrievedResponse.imagen;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  listarProductos(bp:number) : Observable<any>{
    return this.http.post(this.urlBase + '/agregar/' + this.Cliente_id + '/' + bp, { observe: 'response' });
    }

  enlistarProductos(): Observable<any>{
    return this.http.get(this.urlBase + "/" + this.Cliente_id + "/lista").pipe(
      map(response => response as Listado[])
    )
  }

  enlistarProductos_logeado(id:number): Observable<any>{
    return this.http.get(this.urlBase + "/" + id.toString() + "/lista").pipe(
      map(response => response as Listado[])
    )
  }

  obtenerPrecio() : Observable<any>{
    return this.http.get(this.urlBase + '/costo/' + this.Cliente_id)
  }
  
}
