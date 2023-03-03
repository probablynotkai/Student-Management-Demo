import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from 'src/app/components/simple-dialog/simple-dialog.component';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-manage-user-dialog',
  templateUrl: './manage-user-dialog.component.html',
  styleUrls: ['./manage-user-dialog.component.scss']
})
export class ManageUserDialogComponent {
  studentName = "";
  classCode = "";
  carerName = "";
  carerEmail = "";

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpService){
    this.studentName = data.studentName;
    this.classCode = data.classCode;
    this.carerName = data.carerName;
    this.carerEmail = data.carerEmail;
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

  confirmChanges() {
    this.http.updateStudentRecord({studentId: this.data.studentId, studentName: this.studentName, classCode: this.classCode, carerName: this.carerName, carerEmail: this.carerEmail}).subscribe((res) => {
      if(res['status'] == 0 || res['status'] == -1) {
        this.sendUserFeedback('Oops! Something went wrong.', 'An error occured while attempting to enrol this student, more details: ' + res['message']);
      } else {
        this.sendUserFeedback('Operation successful!', `${this.studentName}'s stored records have now been updated, these changes should now be reflected on the management page.`).afterClosed().subscribe(() => {
          this.dialogRef.close();
        });
      }
    })
  }

  deleteRecord() {
    this.http.removeStudentRecord({studentId: this.data.studentId}).subscribe((res) => {
      if(res['status'] == 0 || res['status'] == -1) {
        this.sendUserFeedback('Oops! Something went wrong.', 'An error occured while attempting to enrol this student, more details: ' + res['message']);
      } else {
        this.sendUserFeedback('Operation successful!', `${this.studentName}'s stored records have now been deleted, these changes should now be reflected on the management page.`).afterClosed().subscribe(() => {
          this.dialogRef.close();
        });
      }
    })
  }
}
