import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';
import { LoginComponent } from '../login/login.component';
import { OfertasComponent } from '../ofertas/ofertas.component';
import { RegisterComponent } from '../register/register.component';
import { CanActivateGuard } from './can-activate.guard';

const routes: Routes = [
  {path:'inicio', component: InicioComponent},
  {path:'entrevistas', component: OfertasComponent, canActivate: [CanActivateGuard]},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'', redirectTo: '/inicio', pathMatch: 'full'},
  {path:'**', redirectTo: '/inicio', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
