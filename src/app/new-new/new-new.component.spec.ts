import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNewComponent } from './new-new.component';

describe('NewNewComponent', () => {
  let component: NewNewComponent;
  let fixture: ComponentFixture<NewNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
