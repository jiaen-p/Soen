import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleoService } from 'src/app/shared/empleo.service';
import { Empleo } from 'src/app/models/empleo';

@Component({
  selector: 'app-modificar-empleo',
  templateUrl: './modificar-empleo.component.html',
  styleUrls: ['./modificar-empleo.component.css']
})
export class ModificarEmpleoComponent implements OnInit {

  constructor(private route:ActivatedRoute, public router:Router, public job: EmpleoService) { }
  private job_id: number = null;
  public empleo: Empleo = new Empleo();


  modificar(){
    this.job.putJob(this.empleo).subscribe()
    this.router.navigate(['/dashboard/mis_empleos'])
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.job_id = params['job_id'];
      this.job.getJob(this.job_id).subscribe(data => {
        this.empleo = data[0]
      })
  })
}

}
