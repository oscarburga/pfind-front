import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from  'src/app/producto.service'
import { BodegaService } from '../bodega.service';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent implements OnInit {


  constructor(private router:Router, private productoservicio: ProductoService, private bodegaServicio: BodegaService) { }

  ngOnInit(): void {
  }

}
