import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/api-data.service';
import * as _ from 'lodash';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  groupData: any;
  id = sessionStorage.getItem('uid');
  siteGroupData: any;
  sitesWithGroups: Array<any> = [];
  openEditGroupPopup: boolean;
  editGroupData: any;
  openDeleteGroupPopup: boolean;
  deleteGroupData: any;
  createGroup: boolean;
  sitesWithGroupsDup: any[];
  searchKey: any;
  groupDownloadData: any;

  constructor(private groupApiData: ApiDataService) {}

  ngOnInit(): void {
    this.groupApiData.getGroupData().subscribe((res) => {
      const sites = _.uniq(
        _.filter(res, { uId: this.id }).map((out) => out.Site)
      );
      this.groupData = _.filter(res, { uId: this.id });
      this.siteGroupData = this.groupData.map((group) =>
        _.pick(group, ['Site', 'Group', 'id'])
      );
      sites.forEach((ele) => {
        const arr = [];
        this.siteGroupData.forEach((ele1) => {
          if (ele === ele1.Site) {
            const abc = {
              id: ele1.id,
              name: ele1.Group,
            };
            arr.push(abc);
          }
        });
        const obj = {
          Site: ele,
          Group: arr,
        };
        this.sitesWithGroups.push(obj);
        this.sitesWithGroupsDup = this.sitesWithGroups;
      });
    });
  }

  openEditGroup(site, group) {
    this.openEditGroupPopup = true;
    this.editGroupData = { Site: site, Group: group };
  }

  openDeleteGroup(event) {
    this.groupApiData.getPcData().subscribe((res) => {
      const data = _.filter(res, { uId: this.id, Group: event.name });
      if (data.length) {
        alert('This Group Contains PCs..Hence Deletion Not Possible');
      } else {
        this.openDeleteGroupPopup = true;
        this.deleteGroupData = event.id;
      }
    });
  }

  creatGroupClicked() {
    this.createGroup = true;
  }

  closeCreateGroupModal() {
    this.createGroup = false;
  }

  closeEditGroupModal() {
    this.openEditGroupPopup = false;
  }

  closeDeleteGroupPopup() {
    this.openDeleteGroupPopup = false;
  }

  searchNestedList(event) {
    this.searchKey = event.target.value;
    if (this.searchKey.length >= 3) {
      this.searchKey = this.searchKey.toLowerCase();
      this.sitesWithGroups = this.sitesWithGroupsDup;
      const groupData = this.sitesWithGroups;
      const groupDataWithSearch = [];
      groupData.forEach((ele) => {
        if (ele.Site.toLowerCase().includes(this.searchKey)) {
          groupDataWithSearch.push(ele);
        } else {
          let arr = [];
          _.forEach(ele.Group, (innerEle) => {
            if (innerEle.name.toLowerCase().includes(this.searchKey)) {
              const obj = {
                id: innerEle.id,
                name: innerEle.name,
              };
              arr.push(obj);
            }
          });
          if (arr.length) {
            const obj = {
              Site: ele.Site,
              Group: arr,
            };
            groupDataWithSearch.push(obj);
          }
        }
        this.sitesWithGroups = groupDataWithSearch;
      });
    } else {
      this.sitesWithGroups = this.sitesWithGroupsDup;
    }
  }

  downloadCSV() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Group Data');
    let header = ['Site', 'Group'];
    let headerRow = worksheet.addRow(header);
    this.groupDownloadData = [];
    this.sitesWithGroups.forEach(ele1 => {
      ele1.Group.forEach(ele2 => {
        const obj = {
          Site: ele1.Site,
          Group: ele2.name
        }
        this.groupDownloadData.push(obj)
      });
    })
    for (let x1 of this.groupDownloadData) {
      let x2 = Object.keys(x1);
      let temp = [];
      for (let y of x2) {
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }
    let fname = 'Group Data';
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }
}
