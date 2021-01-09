import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiDataService } from 'src/app/api-data.service';

@Component({
  selector: 'app-delete-pc',
  templateUrl: './delete-pc.component.html',
  styleUrls: ['./delete-pc.component.scss'],
})
export class DeletePcComponent implements OnInit {
  @Input() deletePcData: any;
  @Output() closeDeletePcPopup = new EventEmitter<boolean>();

  constructor(private pcApiData: ApiDataService) {}

  ngOnInit(): void {}

  deletePcDetails() {
    this.pcApiData.deletePcData(this.deletePcData.id).subscribe((resp) => {
      alert(
        'PC with Service Tag : ' +
          this.deletePcData.ServiceTag +
          ' Deleted Successfully'
      );
      window.location.href = '/group';
    });
  }

  closeModal() {
    this.closeDeletePcPopup.emit(true);
  }
}
