import { Component, OnInit } from '@angular/core';
import { BodegaProducto } from '../model/bodega-producto';
import { BodegaService } from '../bodega.service';
import { Categoria } from '../model/categoria';
import { ProductoService } from '../producto.service';
import { Producto } from '../model/producto';
import { NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Bodega } from '../model/bodega';

@Component({
  selector: 'app-registrar-bodega-producto',
  templateUrl: './registrar-bodega-producto.component.html',
  styleUrls: ['./registrar-bodega-producto.component.css']
})
export class RegistrarBodegaProductoComponent implements OnInit {
  bodegaProducto: BodegaProducto;
  bid: number;
  pid: number;
  precio: number;
  categorias: Categoria[];
  productos: Producto[];
  new_label_categoria: String;
  new_label_producto: String;
  new_label_file: String;
  imgURL : any;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  fileName:any;
  bodeguita:Bodega;

  constructor(
    private bodegaService : BodegaService, 
    private productoService: ProductoService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerCategoria()
    this.bodegaProducto = new BodegaProducto();
    this.bodegaService.buscarBodega(this.authService.usuario.idEntity).subscribe(data => this.bodeguita = data);
    this.new_label_file = "Examinar";
  }
  
  save(){
      this.bodegaProducto.bodega = this.bodeguita;
      console.log(this.bodegaProducto);
      this.bodegaService.registrarBodegaProducto(this.bodegaProducto).subscribe(data=> {
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
        this.bodegaService.subirImagenProducto(uploadImageData,this.bodeguita.codigo, this.bodegaProducto.codigo);
        this.router.navigate(['/inicioBodega'])
    })
  }
  
  obtenerCategoria(){
    this.bodegaService.obtenerCategoria().subscribe(data => {
        this.categorias = data;
      })
    }

  buscarProducto(id:number, new_label:String){
    this.new_label_categoria = new_label
    this.productoService.buscarPorCategoria(id).subscribe(
      data => {this.productos = data}
    )
  }

  escogerProducto(pro:Producto, new_label:String){
    this.new_label_producto = new_label;
    this.bodegaProducto.producto = pro;
  }
  onFileSelected(files){
   if (files.length > 0) {
     //Lectura de la imagen para previsualizarla
     var reader= new FileReader();
     this.selectedFile = files[0];
     this.fileName = files[0].name;
     reader.readAsDataURL(files[0]);
     reader.onload = (_event) =>{
       this.imgURL = reader.result;
     }
      const file = files[0];
      this.new_label_file = file.name
   }
  }
}
