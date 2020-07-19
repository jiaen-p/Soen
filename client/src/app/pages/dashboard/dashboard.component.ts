import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Perfil } from 'src/app/models/tipo-perfil.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public usuario: UsuarioService, private router: Router) { 
  }

  ngOnInit(): void {
    if(this.usuario.miPerfil.tipo_perfil === 'empresa'){
      this.router.navigate(['/dashboard/mis_proyectos'])
    } else {
      this.router.navigate(['proyectos/invertidos'])
    }
  }

}
