import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedEmployeeComponent } from './deleted-employee.component';

describe('DeletedEmployeeComponent', () => {
  let component: DeletedEmployeeComponent;
  let fixture: ComponentFixture<DeletedEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
