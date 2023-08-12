import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddEditDialogComponent } from './product-add-edit-dialog.component';

describe('ProductEditDialogComponent', () => {
  let component: ProductAddEditDialogComponent;
  let fixture: ComponentFixture<ProductAddEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAddEditDialogComponent]
    });
    fixture = TestBed.createComponent(ProductAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
