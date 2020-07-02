import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AppComponent} from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent implements OnInit {

  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router, private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.usuario = new Usuario();
    if (this.authService.isAuthenticated()) {
      swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/inicio']);
    }
  }

  login(): void { //autentica
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => { // se suscribe

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/inicio']);
      swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
      this.appComponent.ngOnInit();
    }, err => {
      if (err.status == 400) {
        swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    }
    );
  }

}
