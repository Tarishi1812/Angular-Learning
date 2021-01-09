import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiDataService } from 'src/app/api-data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-pc',
  templateUrl: './edit-pc.component.html',
  styleUrls: ['./edit-pc.component.scss'],
})
export class EditPcComponent implements OnInit {
  id = sessionStorage.getItem('uid');
  @Input() editPcData: any;
  editPc = new FormGroup({
    uId: new FormControl(this.id),
    Site: new FormControl(''),
    Group: new FormControl(''),
    ServiceTag: new FormControl('', Validators.required),
    WarrantyPlan: new FormControl(''),
    OS: new FormControl(''),
    Region: new FormControl(''),
  });
  pcDetailsComplete: boolean;
  warranty = [
    'Basic',
    'Pro Support',
    'Pro Support Plus',
    'Contract Expired',
    'Premium',
    'Premium Plus',
  ];
  region = ['APAC', 'Americas', 'Emea', 'Unknown'];
  os = ['Windows', 'Ubuntu', 'Redhat Linux', 'CentOS'];
  groups: any;
  @Output() closeEditPcModal = new EventEmitter<boolean>();

  constructor(private pcApiData: ApiDataService) {}

  ngOnInit(): void {
    this.editPc = new FormGroup({
      uId: new FormControl(this.id),
      Site: new FormControl(this.editPcData.Site),
      Group: new FormControl(this.editPcData.Group),
      ServiceTag: new FormControl(
        this.editPcData.ServiceTag,
        Validators.required
      ),
      WarrantyPlan: new FormControl(this.editPcData.WarrantyPlan),
      OS: new FormControl(this.editPcData.OS),
      Region: new FormControl(this.editPcData.Region),
    });
    this.checkValues();
    this.pcApiData.getGroupData().subscribe((res) => {
      this.groups = _.uniq(
        _.filter(res, { Site: this.editPcData.Site }).map((out) => out.Group)
      );
    });
  }

  checkValues() {
    let flag = 0;
    _.forEach(this.editPc.value, (value) => {
      if (!value.length) {
        this.pcDetailsComplete = false;
        flag = 1;
      }
    });
    if (flag === 0) {
      this.pcDetailsComplete = true;
    }
  }

  closeModal() {
    this.closeEditPcModal.emit(true);
  }

  editPcDetails() {
    this.pcApiData
      .putPcData(this.editPcData['id'], this.editPc.value)
      .subscribe((resp) => {
        console.log(resp);
        alert('PC Details Saved Successfully');
        window.location.href = '/group';
      });
  }
}
