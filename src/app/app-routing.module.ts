import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group/group.component';
import { AddPcComponent } from './pc/add-pc/add-pc.component';
import { PcListComponent } from './pc/pc-list/pc-list.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'group', component: GroupComponent },
  { path: 'pclist', component: PcListComponent },
  { path: 'addpc', component: AddPcComponent },
  { path: '**', redirectTo: 'signup' }, // Will redirect to this page agar url meh 404 not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
