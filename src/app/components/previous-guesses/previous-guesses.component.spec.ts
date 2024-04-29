import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousGuessesComponent } from './previous-guesses.component';

describe('PreviousGuessesComponent', () => {
  let component: PreviousGuessesComponent;
  let fixture: ComponentFixture<PreviousGuessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousGuessesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviousGuessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
