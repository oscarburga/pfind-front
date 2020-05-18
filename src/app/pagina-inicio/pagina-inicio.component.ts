import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from  'src/app/producto.service'

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent implements OnInit {

  imagen = 'https://cdn.discordapp.com/attachments/476130359545823233/712005957915508862/music-and-multimedia.png'
  busqueda: string;

  constructor(private router:Router, private productoservicio: ProductoService) { }

  ngOnInit(): void {
  }

  buscar():void{
    this.productoservicio.listarProductos(this.busqueda).subscribe(
      data => console.log(data)
    )
  }

}
