import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyectos-interes',
  templateUrl: './proyectos-interes.component.html',
  styleUrls: ['./proyectos-interes.component.css']
})
export class ProyectosInteresComponent implements OnInit {

  constructor(public router:Router) { }

  masInfo(){
    this.router.navigate(["/proyectos/proyecto"],{queryParams:{id:1}})
  }

  ngOnInit(): void {
  }

}
