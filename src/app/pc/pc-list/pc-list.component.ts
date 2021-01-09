import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pc-list',
  templateUrl: './pc-list.component.html',
  styleUrls: ['./pc-list.component.scss'],
})
export class PcListComponent implements OnInit {
  @Input() pcData: any;
  currentPage = 1;
  openEditPcPopup: boolean;
  editPcData: any;
  openDeletePcPopup: boolean;
  deletePcData: any;
  constructor() {}

  ngOnInit(): void {}

  openEditPc(event) {
    this.openEditPcPopup = true;
    this.editPcData = event;
  }

  closeEditPcModal() {
    this.openEditPcPopup = false;
  }

  openDeletePc(event) {
    this.openDeletePcPopup = true;
    this.deletePcData = event;
  }

  closeDeletePcPopup() {
    this.openDeletePcPopup = false;
  }
}
