import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService, private router:Router) { }

  ngOnInit(): void {
  }
  
  save(){
    this.cliente.distrito = "Rimac";
    this.clienteService.registrarCliente(this.cliente).subscribe(data => this.router.navigate([""]));
  }

}
