import { Component, OnInit } from '@angular/core';
import { Bodega } from '../../model/bodega';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BodegaService } from '../../service/bodega.service';

@Component({
  selector: 'app-visualizar-productos-bodega',
  templateUrl: './visualizar-productos-bodega.component.html',
  styleUrls: ['./visualizar-productos-bodega.component.css']
})
export class VisualizarProductosBodegaComponent implements OnInit {
  bod: Bodega;
  constructor(private bodegaService: BodegaService, private _ActivatedRoute : ActivatedRoute, private authService : AuthService) { }

  ngOnInit(): void {
    this.bodegaService.buscarBodega(this.authService.usuario.idEntity).subscribe(data =>{
      console.log(this.bod = data)
    } );

  }
  quitar(id: number){
    this.bodegaService.quitar(id).subscribe(data =>{
      this.ngOnInit();
    });
    
}

}
