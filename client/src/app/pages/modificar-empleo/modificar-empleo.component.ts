import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-empleo',
  templateUrl: './modificar-empleo.component.html',
  styleUrls: ['./modificar-empleo.component.css']
})
export class ModificarEmpleoComponent implements OnInit {

  constructor(public router:Router) { }

  modificar(){
    //this.empresa.modificarProyecto(this.project).subscribe()
    this.router.navigate(['/dashboard'])
  }

  ngOnInit(): void {
  }

}
