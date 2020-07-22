import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from  '../../service/producto.service'
import { BodegaService } from '../../service/bodega.service';
import { AuspiciadorService} from '../../service/auspiciador.service';
import { Auspiciador } from '../../model/auspiciador';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent implements OnInit {
  
  aus: Auspiciador[];

  constructor(private router:Router, private productoservicio: ProductoService, private bodegaServicio: BodegaService,private auspiciadorServicio: AuspiciadorService) {
    
   }

  ngOnInit(): void {
    this.obtenerAuspiciadores()
  }

  obtenerAuspiciadores(): void{
    this.auspiciadorServicio.obtenerAuspiciadores().subscribe(
      data=> this.aus = data
    )
  }

}
