import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarBodegaProductoComponent } from './registrar-bodega-producto.component';

describe('RegistrarBodegaProductoComponent', () => {
  let component: RegistrarBodegaProductoComponent;
  let fixture: ComponentFixture<RegistrarBodegaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarBodegaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarBodegaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
