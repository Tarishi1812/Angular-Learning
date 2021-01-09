import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiDataService } from 'src/app/api-data.service';
import * as _ from 'lodash';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  sites: Array<any>;
  id = sessionStorage.getItem('uid');
  groupNameExists = false;
  createGroup = new FormGroup({
    uId: new FormControl(this.id),
    Site: new FormControl('', Validators.required),
    Group: new FormControl('', Validators.required),
  });
  @Output() closeCreateGroupModal = new EventEmitter<boolean>();

  constructor(private groupApiData: ApiDataService) {}

  ngOnInit(): void {
    this.groupApiData.getPcData().subscribe((res) => {
      this.sites = _.uniq(
        _.filter(res, { uId: this.id }).map((result) => result.Site)
      );
    });
  }

  saveGroup() {
    this.groupApiData
      .postGroupData(this.createGroup.value)
      .subscribe((resp) => {
        console.log(resp);
      });
    alert('Group Created Successfully..!!');
    window.location.href = '/group';
  }

  groupNameChanged() {
    if (this.createGroup.value.Group.length) {
      this.groupNameExists = true;
    } else {
      this.groupNameExists = false;
    }
  }

  closeModal() {
    this.closeCreateGroupModal.emit(true);
  }
}
