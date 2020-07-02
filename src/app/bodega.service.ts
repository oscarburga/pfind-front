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
import { isUndefined, isNull } from 'util';
@Injectable({
  providedIn: 'root'
})
export class BodegaService {
  private urlBase = "http://localhost:8080/bodega";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  retrievedResponse: any;
  retrievedImage: any;
  base64Data: any;
  nombre:string;
  cat_id:number;
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
    this.nombre = nombre;
    return this.http.get(this.urlBase + "/Bodega_Producto_Nombre/" + nombre).subscribe(data => this.dataBusqueda = data);
  }
  
//"/producto/busqueda/cat_id={cid}/nom={nombre}/marc={marca}/bod={bodega}/min={pmin}/max={pmax}/searchbar={sbar}"
buscarCompleto(cid:number, marc:string, bod:string, min:number, max:number, searchbar:number){
  let t1 = "/cat_id="
  let t2 = "/nom="
  let t3 = "/marc="
  let t4 = "/bod="
  let t5 = "/min="
  let t6 = "/max="
  let t7 = "/searchbar="
  let urlfinal = this.urlBase + "/producto/busqueda";
  if (isNull(cid) || isUndefined(cid)) cid = this.cat_id;
  if (!isNull(cid) && !isUndefined(cid)) t1 += cid.toString();
  if (!isNull(this.nombre) && !isUndefined(this.nombre)) t2+= this.nombre;
  if (!isNull(marc) && !isUndefined(marc)) t3 += marc;
  if (!isNull(bod) && !isUndefined(bod)) t4 += bod;
  if (!isNull(min) && !isUndefined(min)) t5 += min;
  if (!isNull(max) && !isUndefined(max)) t6 += max;
  if (!isNull(searchbar) && !isUndefined(searchbar)) t7 += searchbar;
  urlfinal += t1+t2+t3+t4+t5+t6+t7;
  this.http.get(urlfinal).subscribe(data=> this.dataBusqueda = data);
}

  buscarCategoria(id:number){
    this.cat_id = id;
    return this.http.get(this.urlBase + "/producto/buscarBPCtg/" + id).subscribe(data => this.dataBusqueda = data);
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

  subirImagenProducto(imagenData:any, id_bodega:number, id_bp:number){
    return this.http.post(this.urlBase + "/upload_imagen_producto/"+id_bodega+ "/" + id_bp, imagenData, { observe: 'response'}).subscribe(
      (response) => {
        if(response.status === 200){
          console.log("Imagen cargada correctamente")
          console.log(response)
        }else{
          console.log("Imagen no cargada")
        }
      }
    )
  }

  registrarBodegaProducto(bp:BodegaProducto){
    return this.http.post(this.urlBase + "/producto/registrar/" + bp.bodega.codigo ,bp, {headers: this.httpHeaders});
  }

getImageProucto(bp:BodegaProducto){
    this.http.get(this.urlBase + '/get_imagenProducto/'+ bp.bodega.codigo + "/"+ bp.codigo).subscribe(
        res => {
          console.log("data:image/jpeg;base64,"+res)
          return 'data:image/jpeg;base64,' + res;
        }
      );
  }
//######## USANDO ACTUALMENTE ###############################################################

  buscarCategoriaProducto(id:number, nombre:string) :Observable<any>{
    return this.http.get(this.urlBase + "/producto/buscarBPCtgNombre/" + id + "/" + nombre).pipe(
      map(response => response as BodegaProducto[])
    )
  }

}
