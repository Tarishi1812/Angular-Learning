import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiDataService } from '../../api-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userForm = new FormGroup({
    // uId: new FormControl('U1'),
    uName: new FormControl(''),
    uPass: new FormControl(''),
    uEmail: new FormControl(''),
  });
  enableButton = false;
  userData: any;

  constructor(private userApiData: ApiDataService) {}

  ngOnInit(): void {
    this.userApiData.getUserData().subscribe((response) => {
      this.userData = response;
    });
  }

  saveDetails() {
    var flag = 0;
    this.userData.forEach((ele) => {
      if (ele.uEmail === this.userForm.value.uEmail) {
        flag = 1;
        alert('User Already Exists..Please Enter Different Credentials..!!');
        window.location.href = '/signup';
      }
    });
    if (flag === 0) {
      // this.userApiData.postUserData(this.userForm.value).subscribe(response => {
      //   console.log(response);
      // });
      alert('User Registered Successfully..!!');
      window.location.href = '/signup';
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
