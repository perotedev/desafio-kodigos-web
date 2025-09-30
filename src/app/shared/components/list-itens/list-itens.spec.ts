import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItens } from './list-itens';

describe('ListItens', () => {
  let component: ListItens;
  let fixture: ComponentFixture<ListItens>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItens]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItens);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
