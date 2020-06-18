import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Bodega } from './model/bodega';
import { Categoria } from './model/categoria';
import { BodegaProducto } from './model/bodega-producto';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {
  private urlBase = "http://localhost:8080/bodega";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  dataBusqueda: any;
  
  registrarBodega(bodega:Bodega){
    return this.http.post(this.urlBase + "/registrar", bodega, {headers: this.httpHeaders})
  }

  actualizarBodega(bodega:Bodega){
    return this.http.put(this.urlBase + "/actualizar", bodega, {headers: this.httpHeaders})
  }

  buscarBodega(id: number) : Observable<any>{
    return this.http.get(this.urlBase+"/"+id.toString()).pipe(map(response => response as Bodega));
  }

  obtenerCategoria() : Observable<any>{
    return this.http.get("http://localhost:8080/categoria/obtener").pipe(
      map(response => response as Categoria[])
    )
  }

  buscarBodegaProducto(id_categoria: number,
                        nombre: string, marca: string,
                        bodega: string, minimo: number,
                        maximo: number) : Observable<any>{
    let cat_id = "/cat_id=";
    if (id_categoria != null && id_categoria != undefined) cat_id += id_categoria.toString();
    let nom = "/nom=";
    if (nombre != undefined && nombre != null) nom += nombre;
    let marc = "/marc=";
    if (marca != undefined && marca != null) marc+=marca;
    let bod = "/bod=";
    if (bodega != undefined && bodega != null) bod+=bodega;
    let min = "/min=";
    if (minimo != null && minimo != undefined) min+= minimo.toString();
    let max = "/max=";
    if (maximo != null && maximo != undefined) max+= maximo.toString();
    let url_query = this.urlBase + "/producto/busqueda"+cat_id+nom+marc+bod+min+max;
    console.log("REQUEST: ", url_query);
    return this.http.get(url_query).pipe(map(response => response as BodegaProducto[]));
  }
//######## USANDO ACTUALMENTE ###############################################################
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

//######## USANDO ACTUALMENTE ###############################################################

  registrarBodegaProducto(bid: number, pid:number, precio:number) : Observable<Object>{
    return this.http.post(this.urlBase + "/producto/registrar/" + bid.toString() + "/" + pid.toString() + "/" + precio.toString(), {headers: this.httpHeaders});
  }
  /*producto/buscarBPn/{nombre}*/
  /*obtenerBodegaProducto(nombre: string): Observable<any>{
    return this.http.get(this.urlBase + "/producto/buscarBPn/" + nombre)
    .pipe(
      map(response => response as BodegaProducto[])
    );
  }*/



  buscarCategoriaProducto(id:number, nombre:string) :Observable<any>{
    return this.http.get(this.urlBase + "/producto/buscarBPCtgNombre/" + id + "/" + nombre).pipe(
      map(response => response as BodegaProducto[])
    )
  }

}
