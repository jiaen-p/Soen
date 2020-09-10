import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { ChatService } from '../shared/chat.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public img_url: string = null;
  constructor(public usuario: UsuarioService, private router: Router, private chat: ChatService) {

  }

  ngOnInit(): void {
  }

  logout(){
    this.usuario.miPerfil = null;
    this.usuario.perfil_url = null;
    this.usuario.empresa = null;
    this.usuario.inversor = null;
    this.usuario.user_id = null;
    this.chat.conversaciones = null;
    this.router.navigate(['/']);
  }
}
