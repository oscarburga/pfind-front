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
  dataBusqueda: any;
  data_original: any;
  data_porRango: any;
   
   
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
      data => {
        this.dataBusqueda = data;
        this.data_original = data;
      }
    )
  }

  buscarCategoria(id:number){
    return this.http.get(this.urlBase + "/producto/buscarBPCtg/" + id).subscribe(
      data => {
        this.dataBusqueda  = data;
        this.data_original = data;
      }
    )
  }


  descargarData(){
    return this.dataBusqueda;
  }
  
  buscarPorRango(min:number, max:number) {
    let t1 = ""
    let t2 = ""
    if ((!isUndefined(min)) && (!isNull(min))) t1 = min.toString();
    if ((!isUndefined(max)) && (!isNull(max))) t2 = max.toString();
    return this.http.get(this.urlBase + "/producto/Rango/p_min=" + t1 + "/p_max=" + t2).subscribe(data=> {
      this.data_porRango = data;
      this.dataBusqueda = this.intersecarListas(this.data_original, this.data_porRango);
    });
  }

  intersecarListas(A:BodegaProducto[], B:BodegaProducto[]): BodegaProducto[] {
    let ret: BodegaProducto[] = [];
    for(let i = 0; i< A.length; i+=1){
      let contained = false;
      for(let j = 0; j<B.length; j+=1){
        if (B[j].codigo == A[i].codigo) contained = true;
        if (contained) j = B.length;
      }
      if (contained) ret.push(A[i]);
    }
    console.log(ret);
    return ret;
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
