import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';

import { map, catchError, tap } from 'rxjs/operators';
import { Cliente } from './model/cliente';
import { Listado } from './model/listado';
import { identifierModuleUrl } from '@angular/compiler';
import { AuthService } from './auth.service';
import swal from 'sweetalert2';

import { Router } from '@angular/router';

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

  constructor(private http: HttpClient,private router: Router, private authService: AuthService) { }


  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean {
    if (e.status == 401) {

      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }
    if (e.status == 403) {
      swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/inicioBodega']);
      return true;
    }
    
    return false;
  }

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

  registrarLP(cid:number, bpid:number) {
    return this.http.post(this.urlBase + "/registrarLP/cliente_id="+cid+"/bp_id="+bpid, {headers: this.httpHeaders});
  }

  eliminarLP(lpid:number){
    return this.http.delete(this.urlBase + "/quitar/" + lpid, {headers:this.httpHeaders});
  }
  
  obtenerLP(cid:number) : Observable<any> {
    return this.http.get(this.urlBase + "/listar/" + cid, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      }));
  }
  /*
  obtenerLPP(cid:number, bpid:Number) : Observable<any>{
    return this.http.get(this.urlBase + "buscarLP/cid=" + cid + "/bpid="+bpid);
  }
*/
}
