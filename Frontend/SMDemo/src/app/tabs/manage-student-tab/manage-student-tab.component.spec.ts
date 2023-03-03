import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStudentTabComponent } from './manage-student-tab.component';

describe('ManageStudentTabComponent', () => {
  let component: ManageStudentTabComponent;
  let fixture: ComponentFixture<ManageStudentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStudentTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStudentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
