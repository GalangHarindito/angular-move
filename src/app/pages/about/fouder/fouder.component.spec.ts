import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FouderComponent } from './fouder.component';

describe('FouderComponent', () => {
  let component: FouderComponent;
  let fixture: ComponentFixture<FouderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FouderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FouderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
