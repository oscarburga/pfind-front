import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BodegaService } from 'src/app/bodega.service';
import { Categoria } from 'src/app/model/categoria';
import { ProductoService } from 'src/app/producto.service';
import { ClienteService } from 'src/app/cliente.service';
import { AuthService } from './auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pfind';
  busqueda: string;
  logoInicio = 'https://cdn.discordapp.com/attachments/700237020278030396/714972834518270052/online-shopping.png'
  cat: Categoria[];
  desplegarmenu: Boolean = false;
  perfil: any;
  Nombre: string;
  Apellido: string;
  logueado: Boolean = true;
 
  constructor(
    private router: Router,
    private bodegaServicio: BodegaService,
    private productoservicio: ProductoService,
    private clienteServicio: ClienteService,
    private authService: AuthService    
  ) { }

  ngOnInit(): void {
    this.obtenerCategoria();
    if (this.ClienteLogueado()) {
      this.clienteServicio.getImage(this.authService.usuario.id);
    }
    //Si está logueado carga su foto de perfil

    this.router.navigate(["inicio"]);
   
  }

  
  isRClienteRoute() {
    return !(this.router.url == '/loginCliente' || this.router.url == '/loginBodega');
  }

  //Funcion que cambia cuando el cliente se loguea o se desloguea -> Falta que el profe explique
  ClienteLogueado() {
    return this.authService.isAuthenticated();
  }

  isCliente() {
    return this.authService.hasRole('ROLE_CLIENTE');
  }
  
  isBodega() {
    return this.authService.hasRole('ROLE_BODEGA');
  }

  actualizarInformacion(){
    if (this.isCliente()){
      this.router.navigate(['/actualizarCliente'])
    }
    else if (this.isBodega()){
      this.router.navigate(['/actualizarBodega'])
    }
  }
  redireccionarInicio(){
    if (this.isBodega()){
      this.router.navigate(['/inicioBodega'])
    }
    else this.router.navigate(['/inicio'])
  }

  //Contiene la imagen del perfil del cliente logueado
  Perfil() {
    return this.clienteServicio.retrievedImage;
  }

  DatosUsuario() {
    return this.clienteServicio;
  }

  //######## USANDO ACTUALMENTE BUSQUEDA ###############################################################
  buscarNombre() {
    this.bodegaServicio.obtenerBodegaProductoNombre(this.busqueda)
    this.router.navigate(['/buscarProducto'])
  }

  buscarCategoria(id_codigo: number) {
    this.bodegaServicio.buscarCategoria(id_codigo)
    this.router.navigate(['/buscarProducto'])
  }
  //######## USANDO ACTUALMENTE BUSQUEDA ###############################################################

  obtenerCategoria(): void {
    this.bodegaServicio.obtenerCategoria().subscribe(
      data => this.cat = data
    )
  }

  desplegar(): Boolean {
    if (this.desplegarmenu) {
      this.desplegarmenu = false;
    }
    else this.desplegarmenu = true;
    return this.desplegarmenu;
  }

  cerrarSesion(){
    this.logueado = false;
    this.authService.logout();
    this.router.navigate(['/inicio']);
  }

}

