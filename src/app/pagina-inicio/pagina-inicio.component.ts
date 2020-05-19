import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from  'src/app/producto.service'
import { Categoria } from '../model/categoria';
import { BodegaService } from '../bodega.service';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent implements OnInit {

  imagen = 'https://cdn.discordapp.com/attachments/476130359545823233/712005957915508862/music-and-multimedia.png'
  busqueda: string;
  cat: Categoria[];

  constructor(private router:Router, private productoservicio: ProductoService, private bodegaServicio: BodegaService) { }

  ngOnInit(): void {
    this.obtenerCategoria();
  }

  buscar():void{
    this.productoservicio.listarProductos(this.busqueda).subscribe(
      data => console.log(data)
    )
  }

  obtenerCategoria(): void{
    this.bodegaServicio.obtenerCategoria().subscribe(
      data => this.cat = data
    )
  }

}
