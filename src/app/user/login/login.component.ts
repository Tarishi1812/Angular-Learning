import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiDataService } from 'src/app/api-data.service';
import { EventService } from 'src/app/event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    uName: new FormControl(''),
    uPass: new FormControl(''),
    uEmail: new FormControl(''),
  });
  enableButton = false;
  userData: any;

  constructor(private userApiData: ApiDataService, private evt: EventService) {}

  ngOnInit(): void {
    this.userApiData.getUserData().subscribe((response) => {
      this.userData = response;
    });
  }

  saveDetails() {
    var flag = 0;
    this.userData.forEach((ele) => {
      if (
        ele.uName === this.userForm.value.uName &&
        ele.uPass === this.userForm.value.uPass &&
        ele.uEmail === this.userForm.value.uEmail
      ) {
        sessionStorage.setItem('name', ele.uName);
        sessionStorage.setItem('uid', ele.uId);
        alert('Login Successful..!!');
        flag = 1;
        window.location.href = '/group';
      }
    });
    if (flag === 0) {
      alert('Invalid Credentials...Please Enter Again..!!');
      window.location.href = '/login';
    }
  }

  checkValues() {
    if (
      this.userForm.value.uName.length &&
      this.userForm.value.uPass.length &&
      this.userForm.value.uEmail.length
    ) {
      this.enableButton = true;
    } else {
      this.enableButton = false;
    }
  }
}
