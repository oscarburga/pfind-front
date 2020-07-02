import { Component, OnInit } from '@angular/core';
import { BodegaService } from '../bodega.service';
import { Router } from '@angular/router';
import { Bodega } from '../model/bodega';
import { Categoria } from '../model/categoria';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-actualizar-bodega',
  templateUrl: './actualizar-bodega.component.html',
  styleUrls: ['./actualizar-bodega.component.css']
})
export class ActualizarBodegaComponent implements OnInit {

  bID : number;
  bodega: Bodega;
  cat: Observable<Categoria[]>;
  fileName:String;
  selectedFile: File;
  label_imagen: String;

  constructor(
    private bodegaService:BodegaService, 
    private authService:AuthService, 
    private router:Router,
    private appComponent: AppComponent
    ) { }

  ngOnInit(): void {
    this.getCategoria();
    this.bodegaService.buscarBodega(this.authService.usuario.idEntity).subscribe(data => {
      this.bodega = data;
      this.label_imagen = "Selecciona tu imagen de perfil";
    });
  }

  save(){
    this.bodega.productos = null;
    this.bodegaService.actualizarBodega(this.bodega).subscribe(
     data => {
       if(this.selectedFile != undefined){
      const uploadImageData = new FormData();
      console.log(this.selectedFile);
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.bodegaService.subirImagen(uploadImageData);
     }
       this.appComponent.ngOnInit();
     }
    );
  }

  getCategoria(){
    this.bodegaService.obtenerCategoria().subscribe(
      data => this.cat = data
    );
  }

  onFileSelected(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = event.target.files[0].name;
      this.selectedFile = event.target.files[0];
    }

    if(this.fileName.length < 30){
      this.label_imagen = "Imagen seleccionada: " + this.fileName;
    }else{
      if(this.fileName.length > 50){
        this.label_imagen = "Imagen seleccionada"
      }
    }
  }
}
