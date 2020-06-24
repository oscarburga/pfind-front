//ng g g usuarios/guards/auth y luego aplicar este guard a las rutas de la app [app.modules.ts]
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, //inyectar service
    private router: Router) { } //injectar router

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      if(this.isTokenExpirado()){
        this.authService.logout();
        this.router.navigate(['/login']);
        return false; //no pasa al componente
      }
      return true; // pasa al componente
    }
    this.router.navigate(['/login']); //no pasa lo redireccionamos
    return false;
  }

  isTokenExpirado(): boolean
  {
     let token =  this.authService.token;
     let payload = this.authService.obtenerDatosToken(token);
     let now = new Date().getTime()/1000; //secs
     if (payload.exp < now)
     {
       return true;
     }else{
       return false;
     }
  }
}
