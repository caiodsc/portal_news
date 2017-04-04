import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesFormComponent } from './messages-form.component';

describe('MessagesFormComponent', () => {
  let component: MessagesFormComponent;
  let fixture: ComponentFixture<MessagesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
