import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountDetailsComponent } from './count-details.component';

describe('CountDetailsComponent', () => {
  let component: CountDetailsComponent;
  let fixture: ComponentFixture<CountDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountDetailsComponent]
    });
    fixture = TestBed.createComponent(CountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
