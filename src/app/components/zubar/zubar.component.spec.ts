import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZubarComponent } from './zubar.component';

describe('ZubarComponent', () => {
  let component: ZubarComponent;
  let fixture: ComponentFixture<ZubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZubarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
