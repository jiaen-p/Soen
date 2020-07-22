import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { Proyecto } from '../../models/proyecto'

@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html',
  styleUrls: ['./mis-proyectos.component.css']
})
export class MisProyectosComponent implements OnInit {

  constructor(public router: Router, private apiService: ProyectosService) {}

  actualizarProyecto() {
    this.router.navigate(["/dashboard/actualizar"], { queryParams: { id: 1 }
    })
  }

  updateProject(project_id: number, project_name: string, description: string, total_amount: number, remaining_amount: number, end_date: Date, project_img_url: string, sector: string, update_: number) {

      // this.apiService.putProyecto(new Proyecto(project_id, project_name, description, total_amount, remaining_amount, end_date, project_img_url, sector, update_)).subscribe((data) => {
      //   console.log(data);
      // })
    }
    

  deleteProject(id: number) {
    // this.apiService.deleteProyecto(id).subscribe((data) => {
    //   console.log(data);
    // })
  }

  ngOnInit(): void {}

}