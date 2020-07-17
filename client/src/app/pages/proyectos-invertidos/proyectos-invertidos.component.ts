import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyectos-invertidos',
  templateUrl: './proyectos-invertidos.component.html',
  styleUrls: ['./proyectos-invertidos.component.css']
})
export class ProyectosInvertidosComponent implements OnInit {

  constructor(public router:Router) { }

  masInfo(){
    this.router.navigate(["/proyectos/proyecto"],{queryParams:{id:2}})
  }

  ngOnInit(): void {
  }

}
