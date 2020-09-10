import { Component, OnInit } from '@angular/core';
import { EmpleoService } from '../../shared/empleo.service';
import { Empleo } from 'src/app/models/empleo';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsuarioService } from 'src/app/shared/usuario.service';
@Component({
  selector: 'app-empleos',
  templateUrl: './empleos.component.html',
  styleUrls: ['./empleos.component.css']
})
export class EmpleosComponent implements OnInit {

  public jobs: Empleo[] = [];
  public empleos: any;
  public filtrados: Empleo[] = [];
  public job: Empleo;
  public search = '';
  public filtrado: Empleo[] = [];


  constructor(private router: ActivatedRoute, public empleo: EmpleoService, public usuario: UsuarioService) {
    this.empleos = this.empleo.getJobs();
  }

  allJobs()
  {
    this.empleo.getJobs().subscribe((data: any[]) =>
    {
      this.jobs = data;
      Object.assign(this.filtrados, this.jobs);
    }
    );
  }

  // Información de un proyecto recuperando el id
  oneJob(id: number)
  {
    console.log(id);
    this.job = this.jobs.find(({job_id}) => job_id === id);
  }

  // filtra por sector o titulo del anuncio para el input de buscar
  filterSearch(filtro)
  {
    this.search = filtro;
    if (this.search){
      this.filtrados = [];
      for (let i = 0; i < this.jobs.length; i++)
      {
        if (this.jobs[i].sector.includes(this.search) || this.jobs[i].title.includes(this.search))
        {
          console.log(this.jobs[i]);
          this.filtrados.push(this.jobs[i]);

        }
      }
      this.filtrados;
      console.log(this.filtrados);
    }
  }

  filter(experiencia, contrato, jornada)
  {
      this.filtrado = [];
      let filtrado = this.jobs;

      if (experiencia){
        filtrado = filtrado.filter(job => job.experience === experiencia);
      }
      if (contrato){
        filtrado = filtrado.filter(job => job.contract === contrato);
      }
      if (jornada){
        filtrado = filtrado.filter(job => job.working_day === jornada);
      }
      this.filtrados = filtrado;
      console.log(this.filtrado);
  }

  ngOnInit(): void {
    this.allJobs();
  }

}
