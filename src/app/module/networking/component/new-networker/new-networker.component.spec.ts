import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNetworkerComponent } from './new-networker.component';

describe('NewNetworkerComponent', () => {
  let component: NewNetworkerComponent;
  let fixture: ComponentFixture<NewNetworkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNetworkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNetworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
