import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();
  fileName: String;
  label_imagen : String = "Selecciona tu imágen de perfil";
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  ok: Boolean = false;

  constructor(private clienteService: ClienteService, private router:Router) { }

  ngOnInit(): void {
    
  }
  
  save(){
    this.cliente.distrito = "Rimac";
    this.clienteService.registrarCliente(this.cliente).subscribe(data => {
      const uploadImageData = new FormData();
      console.log(this.selectedFile);
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.clienteService.subirImagen(uploadImageData);
      this.router.navigate(["/loginCliente"]);
    });
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
