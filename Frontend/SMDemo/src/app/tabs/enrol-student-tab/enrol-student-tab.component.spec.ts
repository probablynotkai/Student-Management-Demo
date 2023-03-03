import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolStudentTabComponent } from './enrol-student-tab.component';

describe('EnrolStudentTabComponent', () => {
  let component: EnrolStudentTabComponent;
  let fixture: ComponentFixture<EnrolStudentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolStudentTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolStudentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
