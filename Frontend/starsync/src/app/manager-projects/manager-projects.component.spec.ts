import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProjectsComponent } from './manager-projects.component';

describe('ManagerProjectsComponent', () => {
  let component: ManagerProjectsComponent;
  let fixture: ComponentFixture<ManagerProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerProjectsComponent]
    });
    fixture = TestBed.createComponent(ManagerProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
