import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Perfil } from 'src/app/models/tipo-perfil.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public tipoUsuario:Perfil
  constructor(private usuario: UsuarioService) { 
    this.tipoUsuario = usuario.miPerfil.tipo_perfil
  }

  ngOnInit(): void {
  }

}
