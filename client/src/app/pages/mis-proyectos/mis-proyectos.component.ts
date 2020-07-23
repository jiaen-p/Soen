import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Proyecto } from '../../models/proyecto'

@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html',
  styleUrls: ['./mis-proyectos.component.css']
})
export class MisProyectosComponent implements OnInit {

  public projectsUser: Proyecto[]

  constructor(public router: Router, private apiService: ProyectosService, public usuario:UsuarioService) {}

  projectsForUser(id:number)
  {
    this.apiService.getProyectoUser(id = this.usuario.user_id).subscribe((data: any[]) =>
    {
      console.log(this.projectsUser = data);
    }
  )
  }

  ngOnInit(): void {}

}