import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoButtonConfirmComponent } from './two-button-confirm.component';

describe('TwoButtonConfirmComponent', () => {
  let component: TwoButtonConfirmComponent;
  let fixture: ComponentFixture<TwoButtonConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoButtonConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoButtonConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
