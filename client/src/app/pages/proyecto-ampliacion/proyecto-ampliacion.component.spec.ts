import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoAmpliacionComponent } from './proyecto-ampliacion.component';

describe('ProyectoAmpliacionComponent', () => {
  let component: ProyectoAmpliacionComponent;
  let fixture: ComponentFixture<ProyectoAmpliacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoAmpliacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoAmpliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
