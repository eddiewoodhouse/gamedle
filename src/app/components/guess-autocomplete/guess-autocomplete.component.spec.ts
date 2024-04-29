import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessAutocompleteComponent } from './guess-autocomplete.component';

describe('GuessAutocompleteComponent', () => {
  let component: GuessAutocompleteComponent;
  let fixture: ComponentFixture<GuessAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuessAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
