import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageUserDialogComponent } from 'src/app/dialogs/manage-user-dialog/manage-user-dialog.component';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-manage-student-tab',
  templateUrl: './manage-student-tab.component.html',
  styleUrls: ['./manage-student-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageStudentTabComponent implements OnInit {
  studentData;
  sizedData;
  dataLoaded = false;
  pageIndex = 0;
  pageSize = 5;

  constructor(private http: HttpService, private cdr: ChangeDetectorRef, private dialog: MatDialog) {
    this.reloadData();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.reloadData();
  }

  updatePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.reloadData();
  }

  getSizedList(list: [], start: number, end: number) {
    let sizedList = [];

    for(let i = start; i < (list.length > end ? end : list.length); i++) {
      sizedList.push(list[i]);
    }
    return sizedList;
  }

  reloadData() {
    this.http.getAllStudentRecords().subscribe((records: []) => {
      this.studentData = records;
      this.sizedData = this.getSizedList(records, (this.pageIndex * this.pageSize), this.pageIndex * this.pageSize+this.pageSize);
      this.dataLoaded = true;
      this.cdr.markForCheck();
    })
  }

  getStudentData() {
    return this.studentData;
  }

  openManagementDialog(student: any) {
    this.dialog.open(ManageUserDialogComponent, {
      enterAnimationDuration: '50ms',
      exitAnimationDuration: '50ms',
      width: '800px',
      hasBackdrop: true,
      data: student
    }).afterClosed().subscribe(() => {
      this.reloadData();
    })
  }

}
