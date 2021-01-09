import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { ApiDataService } from 'src/app/api-data.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
})
export class EditGroupComponent implements OnInit {
  @Input() editGroupData: any;
  id = sessionStorage.getItem('uid');
  editGroup = new FormGroup({
    uId: new FormControl(this.id),
    Site: new FormControl(''),
    Group: new FormControl(''),
  });
  groupDetailsComplete = false;
  @Output() closeEditGroupModal = new EventEmitter<boolean>();
  modifiedPcData: any;

  constructor(private groupApiData: ApiDataService) {}

  ngOnInit(): void {
    this.editGroup = new FormGroup({
      uId: new FormControl(this.id),
      Site: new FormControl(this.editGroupData.Site),
      Group: new FormControl(this.editGroupData.Group.name),
    });
    this.checkValues();
  }

  editGroupDetails() {
    this.groupApiData
      .putGroupData(this.editGroupData.Group.id, this.editGroup.value)
      .subscribe((res) => {
        console.log(res);
      });
    this.groupApiData.getPcData().subscribe((res) => {
      const pcData = _.filter(res, { uId: this.id });
      const filteredPcData = _.filter(pcData, {
        Group: this.editGroupData.Group.name,
      });
      filteredPcData.forEach((ele) => {
        ele['Group'] = this.editGroup.value.Group;
        this.groupApiData.putPcData(ele['id'], ele).subscribe((res) => {
          console.log('Posted');
        });
      });
      alert('Group Details Saved Successfully');
      window.location.href = '/group';
    });
  }

  checkValues() {
    let flag = 0;
    _.forEach(this.editGroup.value, (value) => {
      if (!value.length) {
        this.groupDetailsComplete = false;
        flag = 1;
      }
    });
    if (flag === 0) {
      this.groupDetailsComplete = true;
    }
  }

  closeModal() {
    this.closeEditGroupModal.emit(true);
  }
}
