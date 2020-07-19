import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User;
  public isEmpresa:boolean = false;
  constructor(private router: Router) {
    this.user = new User();
  }


  onSubmit(form)
  {
    console.log(form.value);
    this.router.navigate(["/register/bussiness"], {queryParams: {bussness_info: form.value}})
    // ir a endpoint de registro en el backend
  }

  ngOnInit(): void {

  }

}
