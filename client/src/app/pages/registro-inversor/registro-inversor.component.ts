import { Component, OnInit } from '@angular/core';
import { Inversor } from '../../models/inversor'
import { Router, ActivatedRoute } from '@angular/router';
import { InversorService } from '../../shared/inversor.service'
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-registro-inversor',
  templateUrl: './registro-inversor.component.html',
  styleUrls: ['./registro-inversor.component.css']
})
export class RegistroInversorComponent implements OnInit {
  public newInversor: Inversor = new Inversor;
  public newInvestor_id: number
  public newUser_id: number
  public newName: string
  public newSurname: string
  public newProfile_url: string
  public newPostal_code: number 

  constructor(private route: ActivatedRoute, private router: Router,public inversorService: InversorService, private usuario:UsuarioService) { }

  save(name: HTMLInputElement, surname: HTMLInputElement, profile_url: HTMLInputElement,postal_code: HTMLInputElement){
    this.newInvestor_id = 0;
    this.newUser_id = 0;
    this.newName = name.value;
    this.newSurname = surname.value;
    this.newProfile_url = profile_url.value;
    this.newPostal_code = Number(postal_code.value);
    this.newInversor = {investor_id: this.newInvestor_id, user_id: this.newUser_id, name: this.newName, surname: this.newSurname, profile_url: this.newProfile_url, postal_code: this.newPostal_code}
    this.inversorService.postInversor(this.newInversor);
    this.usuario.registerInversor(this.newInversor).subscribe(res => {
      console.log(res)
      this.router.navigate(['/login'])
    })
  }

  // redireccion a login

  ngOnInit(): void {
  }

}
