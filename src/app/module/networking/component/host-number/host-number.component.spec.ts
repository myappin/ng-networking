import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostNumberComponent } from './host-number.component';

describe('HostNumberComponent', () => {
  let component: HostNumberComponent;
  let fixture: ComponentFixture<HostNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
