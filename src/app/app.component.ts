import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BodegaService } from 'src/app/bodega.service';
import { Categoria } from 'src/app/model/categoria';
import { ProductoService } from 'src/app/producto.service';
import { ClienteService } from 'src/app/cliente.service';


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
    private clienteServicio: ClienteService
  ) { }

  ngOnInit(): void {
    this.obtenerCategoria();
    if (this.ClienteLogueado()) {
      this.clienteServicio.getImage();
    }
    //Si está logueado carga su foto de perfil

    //this.router.navigate(["inicioBodega"]);
   
  }

  isRClienteRoute() {
    return !(this.router.url == '/loginCliente' || this.router.url == '/loginBodega');
  }

  //Funcion que cambia cuando el cliente se loguea o se desloguea -> Falta que el profe explique
  ClienteLogueado() {
    return this.logueado;
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
  }

}

