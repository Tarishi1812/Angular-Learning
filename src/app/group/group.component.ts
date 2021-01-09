import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import * as _ from 'lodash';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  id: any;
  pcData: any;
  createGroup: boolean;
  addPc: boolean;
  groupData: any;
  searchKey: any;
  pcDataDup: any;
  pcDownloadData: any;

  constructor(private pcApiData: ApiDataService) {}

  ngOnInit(): void {
    this.id = sessionStorage.getItem('uid');
    this.pcApiData.getPcData().subscribe((res) => {
      this.pcData = _.filter(res, { uId: this.id });
      this.pcDataDup = this.pcData;
    });
  }

  addPcClicked() {
    this.addPc = true;
  }

  closeAddPcModal() {
    this.addPc = false;
  }

  searchList(event) {
    this.searchKey = event.target.value;
    if (this.searchKey.length >= 3) {
      this.searchKey = this.searchKey.toLowerCase();
      this.pcData = this.pcDataDup;
      const pcData = this.pcData;
      const pcDataWithSearch = [];
      pcData.forEach((ele) => {
        Object.keys(ele).forEach((key) => {
          if (ele[key].toString().toLowerCase().includes(this.searchKey)) {
            pcDataWithSearch.push(ele);
          }
        });
        this.pcData = pcDataWithSearch;
      });
    } else {
      this.pcData = this.pcDataDup;
    }
  }

  downloadCSV() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('PC Data');
    let header = [
      'Site',
      'Group',
      'ServiceTag',
      'WarrantyPlan',
      'Region',
      'OS',
    ];
    let headerRow = worksheet.addRow(header);
    this.pcDownloadData = this.pcData.map((group) =>
      _.pick(group, [
        'Site',
        'Group',
        'ServiceTag',
        'WarrantyPlan',
        'Region',
        'OS',
      ])
    );
    for (let x1 of this.pcDownloadData) {
      let x2 = Object.keys(x1);
      let temp = [];
      for (let y of x2) {
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }
    let fname = 'PC Data';
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }
}
