import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarClienteComponent } from './components/registrar-cliente/registrar-cliente.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { RegistarBodegaComponent } from './components/registar-bodega/registar-bodega.component';
import { BuscarProductoComponent } from './components/buscar-producto/buscar-producto.component';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
import { RegistrarBodegaProductoComponent } from './components/registrar-bodega-producto/registrar-bodega-producto.component';
import { PaginaInicioComponent } from './components/pagina-inicio/pagina-inicio.component';
import { ListadoProductoComponent } from './components/listado-producto/listado-producto.component';
import { ActualizarBodegaComponent } from './components/actualizar-bodega/actualizar-bodega.component';
import { VisualizarProductoComponent } from './components/visualizar-producto/visualizar-producto.component';
import { VisualizarBodegaComponent } from './components/visualizar-bodega/visualizar-bodega.component';
import { LoginClienteComponent } from './components/login-cliente/login-cliente.component';
import { LoginBodegaComponent } from './components/login-bodega/login-bodega.component';
import { PaginaInicioBodegaComponent} from './components/pagina-inicio-bodega/pagina-inicio-bodega.component';
import { ActualizarClienteComponent } from './components/actualizar-cliente/actualizar-cliente.component';
import { VisualizarProductosBodegaComponent } from './components/visualizar-productos-bodega/visualizar-productos-bodega.component';



const routes: Routes = [
  {path: '', redirectTo: 'customer', pathMatch: 'full'},
  {path: 'inicio', component:PaginaInicioComponent},
  {path: 'registrarUsuario', component:RegistrarUsuarioComponent},
  {path: 'loginUsuario', component:LoginUsuarioComponent},
  {path: 'loginCliente', component:LoginClienteComponent},
  {path: 'loginBodega', component:LoginBodegaComponent},
  {path: 'registrarCliente', component:RegistrarClienteComponent},
  {path: 'registrarBodega', component:RegistarBodegaComponent},
  {path: 'buscarProducto', component:BuscarProductoComponent},
  {path: 'registrarProducto', component:RegistrarProductoComponent},
  {path: 'registrarBP', component:RegistrarBodegaProductoComponent},
  {path: 'lista', component:ListadoProductoComponent},
  {path: 'actualizarBodega', component:ActualizarBodegaComponent},
  {path: 'busqueda/Bodega/Producto/:id', component:VisualizarProductoComponent},
  {path: 'bodega/:bid', component:VisualizarBodegaComponent},
  {path: 'inicioBodega', component:PaginaInicioBodegaComponent},
  {path: 'visualizarBodegaProductos', component: VisualizarProductosBodegaComponent},
  {path: 'actualizarCliente' , component:ActualizarClienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
