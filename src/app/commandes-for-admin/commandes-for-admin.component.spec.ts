import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesForAdminComponent } from './commandes-for-admin.component';

describe('CommandesForAdminComponent', () => {
  let component: CommandesForAdminComponent;
  let fixture: ComponentFixture<CommandesForAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandesForAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandesForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
