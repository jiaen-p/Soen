import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public proyectos_destacados: Proyecto[] = []
  public isUser:boolean = false
  constructor(public proyectos: ProyectosService, private router:Router) { 
    this.proyectos_destacados = proyectos.proyectos.slice(0,4)
  }

  conocerMas(id:number){
    console.log(id)
    if(this.isUser){
      this.router.navigate([`/proyectos/proyecto`], { queryParams: { id: id } })
    } else {
      this.router.navigate(["/register"])
    }
  }

  ngOnInit(): void {
  }

}
