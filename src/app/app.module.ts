import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarClienteComponent } from './components/registrar-cliente/registrar-cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AgmCoreModule } from '@agm/core';
import { PaginaInicioBodegaComponent } from './components/pagina-inicio-bodega/pagina-inicio-bodega.component';
import { ActualizarClienteComponent } from './components/actualizar-cliente/actualizar-cliente.component';
import { VisualizarProductosBodegaComponent } from './components/visualizar-productos-bodega/visualizar-productos-bodega.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrarClienteComponent,
    LoginUsuarioComponent,
    RegistrarUsuarioComponent,
    RegistarBodegaComponent,
    BuscarProductoComponent,
    RegistrarProductoComponent,
    RegistrarBodegaProductoComponent,
    PaginaInicioComponent,
    ListadoProductoComponent,
    ActualizarBodegaComponent,
    VisualizarProductoComponent,
    VisualizarBodegaComponent,
    LoginClienteComponent,
    LoginBodegaComponent,
    PaginaInicioBodegaComponent,
    ActualizarClienteComponent,
    VisualizarProductosBodegaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCRBsEXevVkFRosgbEYdFA77BeY1v1RL9Q'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
