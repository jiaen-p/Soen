import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ProyectoAmpliacionComponent } from './pages/proyecto-ampliacion/proyecto-ampliacion.component';


const routes: Routes = [
  {path:"proyectos", component: ProyectosComponent},
  {path:"proyectos/proyecto", component: ProyectoAmpliacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
