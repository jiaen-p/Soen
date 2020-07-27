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
    this.empleo.getJob(id).subscribe((data: any[]) =>
    {
      this.job = data[0];

    }
    )
  }


  ngOnInit(): void {
    this.allJobs();
    this.router.queryParams.subscribe(params => {
      const job_id = params['job_id'];
      this.oneJob(this.job.job_id);
    });
  }

}
