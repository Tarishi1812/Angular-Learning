import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ApiDataService } from 'src/app/api-data.service';

@Component({
  selector: 'app-add-pc',
  templateUrl: './add-pc.component.html',
  styleUrls: ['./add-pc.component.scss'],
})
export class AddPcComponent implements OnInit {
  id = sessionStorage.getItem('uid');
  addPc = new FormGroup({
    uId: new FormControl(this.id),
    Site: new FormControl('', Validators.required),
    Group: new FormControl('', Validators.required),
    ServiceTag: new FormControl('', Validators.required),
    WarrantyPlan: new FormControl('', Validators.required),
    OS: new FormControl('', Validators.required),
    Region: new FormControl('', Validators.required),
  });
  @Output() closeAddPcModal = new EventEmitter<boolean>();
  pcDetailsComplete = false;
  sites: any;
  groups: any;
  warranty = [
    'Basic',
    'Pro Support',
    'Pro Support Plus',
    'Contract Expired',
    'Premium',
    'Premium Plus',
  ];
  region = ['Asia Pacific', 'Americas', 'Emea', 'Unknown'];
  os = ['Windows', 'Ubuntu', 'Redhat Linux', 'CentOS'];

  constructor(private pcApiData: ApiDataService) {}

  ngOnInit(): void {
    this.pcApiData.getPcData().subscribe((res) => {
      this.sites = _.uniq(
        _.filter(res, { uId: this.id }).map((output) => output.Site)
      );
    });
  }

  siteChanged() {
    this.pcApiData.getGroupData().subscribe((res) => {
      this.groups = _.filter(res, { Site: this.addPc.value.Site }).map(
        (output) => output.Group
      );
    });
  }

  closeModal() {
    this.closeAddPcModal.emit(true);
  }

  addNewPc() {
    this.pcApiData.postPcData(this.addPc.value).subscribe((resp) => {
      console.log(resp);
      alert('PC Details Saved Successfully');
      window.location.href = '/group';
    });
  }

  checkValues() {
    let flag = 0;
    _.forEach(this.addPc.value, (value) => {
      if (!value.length) {
        this.pcDetailsComplete = false;
        flag = 1;
      }
    });
    if (flag === 0) {
      this.pcDetailsComplete = true;
    }
  }
}
