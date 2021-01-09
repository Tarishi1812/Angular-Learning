import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GroupComponent } from './group/group.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { PcComponent } from './pc/pc.component';
import { PcListComponent } from './pc/pc-list/pc-list.component';
import { AddPcComponent } from './pc/add-pc/add-pc.component';
import { EditPcComponent } from './pc/edit-pc/edit-pc.component';
import { DeletePcComponent } from './pc/delete-pc/delete-pc.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { EditGroupComponent } from './group/edit-group/edit-group.component';
import { DeleteGroupComponent } from './group/delete-group/delete-group.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    GroupComponent,
    CreateGroupComponent,
    PcComponent,
    PcListComponent,
    AddPcComponent,
    EditPcComponent,
    DeletePcComponent,
    GroupListComponent,
    EditGroupComponent,
    DeleteGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
