import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindcompanyComponent } from './findcompany.component';

describe('FindcompanyComponent', () => {
  let component: FindcompanyComponent;
  let fixture: ComponentFixture<FindcompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindcompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
