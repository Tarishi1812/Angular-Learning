import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiDataService } from 'src/app/api-data.service';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss'],
})
export class DeleteGroupComponent implements OnInit {
  @Output() closeDeleteGroupPopup = new EventEmitter<boolean>();
  @Input() deleteGroupData: any;

  constructor(private groupApiData: ApiDataService) {}

  ngOnInit(): void {}

  deleteGroupDetails() {
    this.groupApiData.deleteGroupData(this.deleteGroupData).subscribe((res) => {
      alert('Group Deleted Permanently');
      window.location.href = '/group';
    });
  }

  closeModal() {
    this.closeDeleteGroupPopup.emit(true);
  }
}
