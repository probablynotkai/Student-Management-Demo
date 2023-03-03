import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserDialogComponent } from './manage-user-dialog.component';

describe('ManageUserDialogComponent', () => {
  let component: ManageUserDialogComponent;
  let fixture: ComponentFixture<ManageUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
