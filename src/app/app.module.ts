import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { RegistarBodegaComponent } from './registar-bodega/registar-bodega.component';
import { BuscarProductoComponent } from './buscar-producto/buscar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarClienteComponent,
    LoginUsuarioComponent,
    RegistrarUsuarioComponent,
    RegistarBodegaComponent,
    BuscarProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
