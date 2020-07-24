import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public projects_featured: Proyecto[] = []

  constructor(public apiService: ProyectosService, private router:Router, private usuario: UsuarioService) { 
   
  }
  
  featuredProjects(){
    this.apiService.getProyectos().subscribe((data: any[]) =>
    {
      this.projects_featured = data.slice(0,4);
      console.log(this.projects_featured);
    }
    )
  }

  conocerMas(id:number){
    console.log(id)
    if(this.usuario.miPerfil){
      this.router.navigate([`/proyectos/proyecto`], { queryParams: { id: id } })
    } else {
      this.router.navigate(["/register"])
    }
  }

  ngOnInit(): void {
    this.featuredProjects();
  }

}
