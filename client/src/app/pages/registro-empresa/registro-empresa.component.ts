import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa'
import { Sectores } from 'src/app/models/sectores.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {
  public empresa: Empresa = new Empresa();
  
 
  constructor(private route: ActivatedRoute, private router: Router, private usuario: UsuarioService) { }

  save(direccion: string, nif: string, telefono: number,web_url: string,descripcion: string, logo_url: string, company_name: string, sector: string){
    this.empresa = {
      direccion: direccion, nif:nif, telefono:telefono, web_url: web_url, 
      descripcion: descripcion, profile_url: logo_url, 
      company_name: company_name, sector: sector,
      company_id: null,
      user_id: null
    }

    // registrar empresa
    this.usuario.registerEmpresa(this.empresa).subscribe(res => {
      console.log(res)
      if (res === 201){
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/register'])
      }
    })
  }


  ngOnInit(): void {
  }

}
