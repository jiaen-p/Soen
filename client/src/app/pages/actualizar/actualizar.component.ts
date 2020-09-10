import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { EmpresaService } from 'src/app/shared/empresa.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  private project_id: number;
  public project: Proyecto = new Proyecto();
  constructor(public proyectos: ProyectosService, private route: ActivatedRoute, private empresa: EmpresaService, private router: Router, public _location: Location) { }
//  update__
  actualizar(actualizar: string){
    this.project.update = actualizar;
    this.empresa.modificarProyecto(this.project).subscribe(res => {
      this.navegar();
    });
  }
// actualizar acquared amount
  financiacion(financiacion: string){
    this.project.remaining_amount -= Number(financiacion);
    this.empresa.modificarProyecto(this.project).subscribe(res => {
      this.navegar();
    });
  }

  objetivos(){
    this.project.remaining_amount = 0;
    this.empresa.modificarProyecto(this.project).subscribe(res => {
      this.navegar();
    });
  }

  private navegar(){
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.project_id = params.project_id;
      this.proyectos.getProyecto(this.project_id).subscribe(data => {
        this.project = data[0];
      });
    });
  }

}
