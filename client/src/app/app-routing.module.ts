import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ProyectoAmpliacionComponent } from './pages/proyecto-ampliacion/proyecto-ampliacion.component';
import { PublicarProyectoComponent } from './pages/publicar-proyecto/publicar-proyecto.component';
import { ChatComponent } from './pages/chat/chat.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProyectosInvertidosComponent } from './pages/proyectos-invertidos/proyectos-invertidos.component';
import { ProyectosInteresComponent } from './pages/proyectos-interes/proyectos-interes.component';
import { MisProyectosComponent } from './pages/mis-proyectos/mis-proyectos.component';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';


const routes: Routes = [
  {path:"proyectos", component: ProyectosComponent},
  {path:"proyectos/proyecto", component: ProyectoAmpliacionComponent},
  {path:"publicar", component: PublicarProyectoComponent},
  {path:"chat", component: ChatComponent},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"proyectos/invertidos", component: ProyectosInvertidosComponent},
  {path:"proyectos/interes", component: ProyectosInteresComponent},
  {path:"dashboard/mis_proyectos", component: MisProyectosComponent},
  {path:"dashboard/actualizar", component: ActualizarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
