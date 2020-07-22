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
  public img_url: string = null
  constructor(public usuario:UsuarioService, private router:Router) { 
    
  }

  ngOnInit(): void {
    this.img_url = this.usuario.empresa.logo_url || this.usuario.inversor.profile_url
    console.log(this.img_url)
    // if(this.usuario.empresa){
    // } else {
    //   this.img_url = this.usuario.inversor.profile_url
    // }
  }

  logout(){
    this.usuario.miPerfil = null
    this.usuario.perfil_url = null
    this.usuario.empresa = null
    this.usuario.inversor = null
    this.router.navigate(["/"])
  }
}
