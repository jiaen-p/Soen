import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { ChatService } from 'src/app/shared/chat.service';

@Component({
  selector: 'app-proyectos-invertidos',
  templateUrl: './proyectos-invertidos.component.html',
  styleUrls: ['./proyectos-invertidos.component.css']
})
export class ProyectosInvertidosComponent implements OnInit {

  public projects: Proyecto[]

  constructor(public router:Router, private apiService: ProyectosService, public chat: ChatService) { }

  // Coge los proyectos asociados al usuario por su id
  projectsForUser(id:number)
  {
    this.apiService.getProyectoUser(id).subscribe((data: any[]) =>
    {
      console.log(this.projects = data);
    }
  )
  }

  ngOnInit(): void {
  }

  // abrir conversacion
  goToConversation(project_id){
    this.chat.openConversation(project_id).subscribe(res => {
      console.log(res)
    })
  }
}
