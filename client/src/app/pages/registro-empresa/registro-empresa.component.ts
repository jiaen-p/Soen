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
  public newEmpresa: Empresa = new Empresa();
  public newNombre: string
  public newDireccion: string
  public newNif:string
  public newTelefono: number
  public newFax: number
  public newEmail: string
  public newWeb: string
  public newDescripcion: string
  public newImg_url: string
  public newId: number;
  public newSector: string;

  
 
  constructor(private route: ActivatedRoute, private router: Router, private usuario: UsuarioService) { }

  save(nombre: HTMLInputElement, direccion: HTMLInputElement, nif: HTMLInputElement, telefono: HTMLInputElement,fax: HTMLInputElement,email: HTMLInputElement,web: HTMLInputElement, descripcion: HTMLInputElement, img_url: HTMLInputElement, sector: HTMLInputElement){
    this.newNombre = nombre.value;
    this.newDireccion = direccion.value;
    this.newNif = nif.value;
    this.newTelefono = Number(telefono.value);
    this.newFax = Number(fax.value);
    this.newEmail = email.value;
    this.newWeb = web.value;
    this.newDescripcion = descripcion.value;
    this.newImg_url = img_url.value;
    this.newId = 0;
    this.newSector = sector.value;
    this.newEmpresa =  {nombre:this.newNombre, direccion: this.newDireccion, nif: this.newNif, telefono: this.newTelefono, fax: this.newFax,email: this.newEmail, web: this.newWeb, descripcion: this.newDescripcion, img_url: this.newImg_url,id: this.newId,sector: <Sectores>this.newSector}
    // console.log(this.newEmpresa);

    // registrar empresa
    this.usuario.registerEmpresa(this.newEmpresa).subscribe(res => {
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
