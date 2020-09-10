import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public user: User = new User();
  public autentificado = false;
  constructor(private router: Router, private usuario: UsuarioService) {  }


  onSubmit(form)
  {
    // realizar autentificacion con el servidor y cambiar autentificado a true
    // asignar el perfil de usuario al servicio de usuario
    if (form.value.email && form.value.password){
      this.usuario.login(form.value).then(res => {
        this.usuario.userinfo = form.value;
        if (res){
          // asignar el tipo de perfil con el nuevo usuario del login
          if (res[0][0].company_id){
            this.usuario.empresa = res[0][0];
          } else {
            this.usuario.inversor = res[0][0];
          }
          this.usuario.perfil_url = res[0][0].profile_url;
          this.usuario.user_id = res[0][0].user_id;
          this.usuario.miPerfil = res[1][0];
          this.router.navigate(['/dashboard']);
        }
      })
      .catch(null);
    }
  }

  ngOnInit(): void {
  }
}
