import { Component, OnInit } from '@angular/core';
import { EmpleoService } from '../../shared/empleo.service'
import { Empleo } from 'src/app/models/empleo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empleos',
  templateUrl: './empleos.component.html',
  styleUrls: ['./empleos.component.css']
})
export class EmpleosComponent implements OnInit {

  public jobs: Empleo[] = []
  public empleos: any
  public filtrados: Empleo[] = []
  public job: Empleo

  constructor(private router: ActivatedRoute, public empleo: EmpleoService) { 
    this.empleos = this.empleo.getJobs()
  }

  allJobs()
  {
    this.empleo.getJobs().subscribe((data: any[]) =>
    {
      this.jobs = data;
      Object.assign(this.filtrados, this.jobs);
    }
    )
  }

  oneJob(id:number)
  {
    console.log(id)
    this.job = this.jobs.find(({job_id}) => job_id === id)
  }


  ngOnInit(): void {
    this.allJobs();
    //this.oneJob(this.jobs[0].job_id)
  }

}
