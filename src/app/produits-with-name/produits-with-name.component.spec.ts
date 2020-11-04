import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsWithNameComponent } from './produits-with-name.component';

describe('ProduitsWithNameComponent', () => {
  let component: ProduitsWithNameComponent;
  let fixture: ComponentFixture<ProduitsWithNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitsWithNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitsWithNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
