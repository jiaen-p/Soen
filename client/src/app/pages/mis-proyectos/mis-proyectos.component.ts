import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html',
  styleUrls: ['./mis-proyectos.component.css']
})
export class MisProyectosComponent implements OnInit {

  constructor(public router: Router) { }

  actualizarProyecto(){
    this.router.navigate(["/dashboard/actualizar"],{queryParams:{id:1}})
  }

  ngOnInit(): void {
  }

}
