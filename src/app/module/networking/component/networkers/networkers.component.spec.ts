import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkersComponent } from './networkers.component';

describe('NetworkersComponent', () => {
  let component: NetworkersComponent;
  let fixture: ComponentFixture<NetworkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
