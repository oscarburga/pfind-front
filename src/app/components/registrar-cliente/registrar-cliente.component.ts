import { Component, OnInit, Input } from '@angular/core';
import { ClienteService } from '../../service/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../../model/cliente';
import { AuthService } from '../../service/auth.service';
import swal from 'sweetalert2'

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
  clientito:any;

  constructor(
    private clienteService: ClienteService, 
    private router:Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    
  }
  
  save(){
    this.cliente.distrito = "Rimac";
    this.clienteService.registrarCliente(this.cliente).subscribe(data => {
      this.clientito = data
      const uploadImageData = new FormData();
      console.log(this.selectedFile);
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.clienteService.subirImagen(this.clientito.codigo, uploadImageData);
      this.router.navigate(["/loginCliente"]);
    });
  }

    onFileSelected(event){
    var file = event.target.files[0];
    console.log(file)
    if (file.size < 1048576) {
      console.log("entro a la funcion")
      this.fileName = file.name;
      this.selectedFile = file;
      if(this.fileName.length < 30){
        this.label_imagen = this.fileName;
      }else{
        if(this.fileName.length > 50){
          this.label_imagen = "Imagen seleccionada"
        }
      }
    }else{
      file = []
      this.label_imagen ="Imagen muy grande";
      swal.fire('Error', `Imagen muy grande!`, 'error');
    }
  }
}
