import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioaddComponent } from './usuarioadd.component';

describe('UsuarioaddComponent', () => {
  let component: UsuarioaddComponent;
  let fixture: ComponentFixture<UsuarioaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioaddComponent]
    });
    fixture = TestBed.createComponent(UsuarioaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
