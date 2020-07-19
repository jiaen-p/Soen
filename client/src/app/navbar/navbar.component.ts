import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public usuario:UsuarioService, private router:Router) { 
    
  }

  ngOnInit(): void {
  }

  logout(){
    this.usuario.miPerfil = null
    this.router.navigate(["/"])
  }
}
