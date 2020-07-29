import { Component, OnInit } from '@angular/core';
import { Empleo } from '../../models/empleo'
import { Sectores } from 'src/app/models/sectores.enum';
import { Contracts } from 'src/app/models/contract.enum';
import { WorkingDays } from 'src/app/models/working-day.enum'
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { EmpleoService } from 'src/app/shared/empleo.service';


@Component({
  selector: 'app-publicar-empleo',
  templateUrl: './publicar-empleo.component.html',
  styleUrls: ['./publicar-empleo.component.css']
})
export class PublicarEmpleoComponent implements OnInit {


  constructor(private router:Router, private usuario:UsuarioService, private empleo: EmpleoService) { }

  save( title: string, sector: string, description:string, working_day: string, contract:string, salary: number, requeriments:string, experiencia:string){
    let empleo = new Empleo()
    empleo = {
      job_id: null, 
      company_id: this.usuario.empresa.company_id,
      company_name:this.usuario.empresa.company_name, 
      title: title, 
      sector: <Sectores>sector, 
      description: description,
      working_day: <WorkingDays>working_day,
      contract: <Contracts>contract,
      salary: salary,
      requirements: requeriments,
      experience: experiencia
    }
    console.log(empleo)
    this.empleo.postJob(empleo).subscribe(res => {
      this.router.navigate(['/dashboard'])
    })
    
  }
  ngOnInit(): void {
  }

}
