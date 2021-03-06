import { Component, OnInit } from '@angular/core';
import { Empleo } from '../../models/empleo';
import { Sectores, Sector } from 'src/app/models/sectores.enum';
import { Contracts } from 'src/app/models/contract.enum';
import { WorkingDays } from 'src/app/models/working-day.enum';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { EmpleoService } from 'src/app/shared/empleo.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-publicar-empleo',
  templateUrl: './publicar-empleo.component.html',
  styleUrls: ['./publicar-empleo.component.css']
})
export class PublicarEmpleoComponent implements OnInit {
  public sector = Sector;
  public sectorType = [];
  public sectorName = [];

  constructor(private router: Router, private usuario: UsuarioService, private empleo: EmpleoService, public _location: Location) { }

  save( company_name: string, title: string, sector: string, description: string, working_day: string, contract: string, salary: number, requeriments: string, experiencia: string, email: string){
    let empleo = new Empleo();
    empleo = {
      job_id: null,
      company_id: this.usuario.empresa.company_id,
      company_name,
      title,
      sector: sector as Sectores,
      description,
      working_day: working_day as WorkingDays,
      contract: contract as Contracts,
      salary,
      requirements: requeriments,
      experience: experiencia,
      email
    };
    console.log(empleo);
    this.empleo.postJob(empleo).subscribe(res => {
      this.router.navigate(['/dashboard']);
    });

  }
  ngOnInit(): void {
    this.sectorType = Object.keys(this.sector);
    this.sectorName = Object.values(this.sector);
  }

}
