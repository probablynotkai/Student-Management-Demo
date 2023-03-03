import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = "http://localhost:8080/v1/";

  constructor(private http: HttpClient) { }

  getAllStudentRecords() {
    return this.http.get(this.apiUrl + "getAllStudentRecords");
  }

  enrolNewStudent(data: {studentName: string, classCode: string, carerName: string, carerEmail: string}) {
    return this.http.post(this.apiUrl + "enrolNewStudent", data);
  }

  updateStudentRecord(data: {studentId: string, studentName: string, classCode: string, carerName: string, carerEmail: string}) {
    return this.http.post(this.apiUrl + "updateStudentRecord", data);
  }

  removeStudentRecord(data: {studentId: string}) {
    return this.http.post(this.apiUrl + "removeStudentRecord", data);
  }
}
