import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa'
import { Sectores, Sector } from 'src/app/models/sectores.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {
  private empresa: Empresa = new Empresa();
  public sector = Sector
  public sectorType = []
  public sectorName = []
 
  constructor(private route: ActivatedRoute, private router: Router, private usuario: UsuarioService) { }

  save(direccion: string, nif: string, telefono: string, web_url: string, descripcion: string, logo_url: string, company_name: string, sector: Sectores){
    this.empresa = {
      direction: direccion,
      nif: nif,
      telefono: Number(telefono),
      web_url: web_url,
      descripcion_company: descripcion,
      profile_url: logo_url,
      company_name: company_name,
      sector: sector,
      company_id: null,
      user_id: null
    }
    // registrar empresa
    this.usuario.registerEmpresa(this.empresa).subscribe(res => {
      console.log(res)
      if (res){
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/register'])
      }
    })
  }


  ngOnInit(): void {
    this.sectorType = Object.keys(this.sector)
    this.sectorName = Object.values(this.sector)
  }

}
