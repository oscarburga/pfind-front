import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Bodega } from './model/bodega';
import { Categoria } from './model/categoria';
import { BodegaProducto } from './model/bodega-producto';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Resena } from './model/resena' ;
import { R3ResolvedDependencyType } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class BodegaService {
  private urlBase = "http://localhost:8080/bodega";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  dataBusqueda: any;
   
//######## USANDO ACTUALMENTE ###############################################################
  registrarBodega(bodega:Bodega){
    return this.http.post(this.urlBase + "/registrar", bodega, {headers: this.httpHeaders})
  }
  crearResena(resena: Resena, bid : number, cid: number) : Observable<Object>{
    return this.http.post(this.urlBase+"/resena" + "/registrar/" +  bid.toString() + "/" + cid.toString(), resena, {headers: this.httpHeaders});
  }
  actualizarBodega(bodega:Bodega){
    return this.http.put(this.urlBase + "/actualizar", bodega, {headers: this.httpHeaders})
  }

  buscarBodega(id: number) : Observable<any>{
    return this.http.get(this.urlBase+"/"+ id.toString()).pipe(map(response => response as Bodega));
  }

  obtenerResenas(): Observable<any>{
    return this.http.get(this.urlBase + "/resena/obtener").pipe(
      map(response => response as Resena[])
    )
  }

  obtenerCategoria() : Observable<any>{
    return this.http.get("http://localhost:8080/categoria/obtener").pipe(
      map(response => response as Categoria[])
    )
  }
 
  obtenerBodegaProductoNombre(nombre: string){
    return this.http.get(this.urlBase + "/Bodega_Producto_Nombre/" + nombre).subscribe(
      data => this.dataBusqueda = data
    )
  }

  buscarCategoria(id:number){
    return this.http.get(this.urlBase + "/producto/buscarBPCtg/" + id).subscribe(
      data => this.dataBusqueda  = data
    )
  }

  descargarData(){
    return this.dataBusqueda;
  }

  obtenerBodegaProductoId(id:number) : Observable<any>{
    return this.http.get(this.urlBase + '/Bodega_Producto_Id/' + id).pipe(map(response => response as BodegaProducto));
  }

  obtenerdeDireccion(direccion:string) : Observable<any>{
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+direccion+"Lima,+Peru&key="+"AIzaSyCRBsEXevVkFRosgbEYdFA77BeY1v1RL9Q").pipe(
      
    )
  }

  obtenerdeLngLat(lng:number, lat:number) : Observable<any>{
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lng+','+lat + "&key="+"AIzaSyCRBsEXevVkFRosgbEYdFA77BeY1v1RL9Q").pipe(
      
    )
  }

  subirImagen(imagenData:any){
    return this.http.post(this.urlBase + "/upload_imagen" , imagenData, { observe: 'response' }).subscribe(
      (response) => {
        if(response.status === 200){
          console.log("Imagen cargada correctamente")
        }else{
          console.log("Imagen no cargada")
          }
        }
    )
  }

//######## USANDO ACTUALMENTE ###############################################################

  registrarBodegaProducto(bid: number, pid:number, precio:number) : Observable<Object>{
    return this.http.post(this.urlBase + "/producto/registrar/" + bid.toString() + "/" + pid.toString() + "/" + precio.toString(), {headers: this.httpHeaders});
  }

  buscarCategoriaProducto(id:number, nombre:string) :Observable<any>{
    return this.http.get(this.urlBase + "/producto/buscarBPCtgNombre/" + id + "/" + nombre).pipe(
      map(response => response as BodegaProducto[])
    )
  }

}
