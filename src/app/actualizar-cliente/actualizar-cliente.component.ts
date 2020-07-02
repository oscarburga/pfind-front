import { Component, OnInit, Input } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {
  cliente: Cliente = new Cliente();
  fileName: String;
  label_imagen : String = "Selecciona tu imagen de perfil";
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  ok: Boolean = false;

  constructor(
    private clienteService: ClienteService, 
    private authService: AuthService, 
    private router:Router,
    private appComponent: AppComponent
    ) { }

  ngOnInit(): void {
    this.clienteService.buscarCliente(this.authService.usuario.idEntity).subscribe(data=>this.cliente = data);
  }

  save(){
    this.cliente.distrito = "Rimac";
    this.clienteService.actualizarCliente(this.cliente).subscribe(data => {
      if(this.selectedFile != undefined){
        const uploadImageData = new FormData();
        console.log(this.selectedFile);
        uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
        this.clienteService.subirImagen(this.authService.usuario.idEntity, uploadImageData);
      }
      this.appComponent.ngOnInit();
    });
  }
  onFileSelected(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = file.name;
      this.selectedFile = file;
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
