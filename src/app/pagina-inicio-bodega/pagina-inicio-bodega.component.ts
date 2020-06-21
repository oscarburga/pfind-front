import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationStart } from '@angular/router';
import { BodegaService } from '../bodega.service';
import { Bodega } from '../model/bodega';
@Component({
  selector: 'app-pagina-inicio-bodega',
  templateUrl: './pagina-inicio-bodega.component.html',
  styleUrls: ['./pagina-inicio-bodega.component.css']
})
export class PaginaInicioBodegaComponent implements OnInit {

  bodega: Bodega;
  constructor(private bodegaService: BodegaService, private _ActivatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.bodegaService.buscarBodega(1).subscribe(data => console.log(this.bodega = data));
  }

}
