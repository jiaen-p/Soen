import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public user;

  constructor() 
  {
    this.user = new User();
  }


  onSubmit(form)
  {
    console.log(form.value);
  }

  ngOnInit(): void {
  }


}
