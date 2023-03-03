import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule as MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatDialogModule as MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { ManageStudentTabComponent } from './tabs/manage-student-tab/manage-student-tab.component';
import { EnrolStudentTabComponent } from './tabs/enrol-student-tab/enrol-student-tab.component';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { ManageUserDialogComponent } from './dialogs/manage-user-dialog/manage-user-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: ManageStudentTabComponent
  },
  {
    path: 'enrol',
    component: EnrolStudentTabComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ManageStudentTabComponent,
    EnrolStudentTabComponent,
    SimpleDialogComponent,
    ManageUserDialogComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
