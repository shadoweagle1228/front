import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialsegmentComponent } from './commercialsegment.component';

describe('CommercialsegmentComponent', () => {
  let component: CommercialsegmentComponent;
  let fixture: ComponentFixture<CommercialsegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialsegmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommercialsegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
