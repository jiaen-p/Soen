import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { ChatService } from 'src/app/shared/chat.service';
import { InversorService } from 'src/app/shared/inversor.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-proyectos-invertidos',
  templateUrl: './proyectos-invertidos.component.html',
  styleUrls: ['./proyectos-invertidos.component.css']
})
export class ProyectosInvertidosComponent implements OnInit {

  public projects: Proyecto[]
  public invertidos: number;
  public proyectosInvertidos:any[] = [];

  constructor(public router:Router, private apiService: ProyectosService, public chat: ChatService, private usuario: UsuarioService, private inversor: InversorService) { }

  proyectosInvertido(){
    this.inversor.getProyectosInvertido(this.usuario.user_id).subscribe((data: any[]) =>{
      
     for(let index = 0;index <= data.length-1;index++){
       this.invertidos = data[index].project_id;
       console.log(this.invertidos)
       this.apiService.getProyecto(this.invertidos).subscribe((data: any[]) =>{
 
         this.proyectosInvertidos.push(data);
         
       });
     }});
   console.log(this.proyectosInvertidos);
 
   }

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
