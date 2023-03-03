import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from 'src/app/components/simple-dialog/simple-dialog.component';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-enrol-student-tab',
  templateUrl: './enrol-student-tab.component.html',
  styleUrls: ['./enrol-student-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnrolStudentTabComponent implements OnInit {
  name = "";
  classCode = "";
  carerName = "";
  carerEmail = "";

  constructor(private dialog: MatDialog, private http: HttpService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  sendUserFeedback(heading: string, content: string) {
    return this.dialog.open(SimpleDialogComponent, {
      enterAnimationDuration: '50ms',
      exitAnimationDuration: '50ms',
      width: '800px',
      hasBackdrop: true,
      data: {
        heading: heading,
        content: content
      }
    })
  }

  revertChanges() {
    window.location.reload()
  }

  enrolStudent() {
    if(this.name == "" || this.classCode == "" || this.carerName == "" || this.carerEmail == "") {
      this.sendUserFeedback('Oops! Something went wrong.', 'It seems that you are missing some data, please remember to fill all required fields.');
    } else {
      this.http.enrolNewStudent({studentName: this.name, classCode: this.classCode, carerName: this.carerName, carerEmail: this.carerEmail}).subscribe((res) => {
        if(res['status'] == 0 || res['status'] == -1) {
          this.sendUserFeedback('Oops! Something went wrong.', 'An error occured while attempting to enrol this student, more details: ' + res['message']);
        } else {
          this.sendUserFeedback('Operation successful!', 'A student profile has been created for the ' + this.name + ', please take note of their new student ID: ' + res['id'] + ".").afterClosed().subscribe(() => {
            this.revertChanges()
          });
        }
      })
    }
  }

}
