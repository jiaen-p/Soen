import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user:Usuario
  constructor(private usuario:UsuarioService) { 
    console.log(this.usuario.miPerfil)
    
  }

  ngOnInit(): void {
    this.user = this.usuario.miPerfil
  }

}
