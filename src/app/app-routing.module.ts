import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { RegistarBodegaComponent } from './registar-bodega/registar-bodega.component';
import { BuscarProductoComponent } from './buscar-producto/buscar-producto.component';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';


const routes: Routes = [
  {path: '', redirectTo: 'customer', pathMatch: 'full'},
  {path: 'registrarUsuario', component:RegistrarUsuarioComponent},
  {path: 'loginUsuario', component:LoginUsuarioComponent},
  {path: 'registrarCliente', component:RegistrarClienteComponent},
  {path: 'registrarBodega', component:RegistarBodegaComponent},
  {path: 'buscarProducto', component:BuscarProductoComponent},
  {path: 'registrarProducto', component:RegistrarProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
