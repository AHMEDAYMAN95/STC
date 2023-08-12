import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Product } from 'src/app/models/productModel';
import { SharedService } from 'src/app/services/shared.service';
import { SnackBarService } from 'src/app/services/snackBar.service';

@Component({
  selector: 'app-product-add-edit-dialog',
  templateUrl: './product-add-edit-dialog.component.html',
  styleUrls: ['./product-add-edit-dialog.component.scss'],
})
export class ProductAddEditDialogComponent implements OnInit {
  productForm!: FormGroup;
  categories: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public productAddEditData: Product,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private dialogRef: MatDialogRef<ProductAddEditDialogComponent>,
    private snackBarService: SnackBarService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.intFormControls();
    this.setFormDataInEditMode();
  }

  intFormControls() {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  setFormDataInEditMode() {
    if (this.productAddEditData) {
      this.productForm.controls['title'].setValue(this.productAddEditData.title);
      this.productForm.controls['category'].setValue(
        this.productAddEditData.category
      );
      this.productForm.controls['price'].setValue(this.productAddEditData.price);
      this.productForm.controls['description'].setValue(
        this.productAddEditData.description
      );
      this.productForm.controls['image'].setValue(this.productAddEditData.image);
    }
  }

  loadCategories() {
    this.sharedService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSaveProduct() {
    if (this.productForm.valid) {
      if (!this.productAddEditData) {
        this.addProduct();
      } else {
        this.updateProduct();
      }
    }
  }

  addProduct() {
    this.sharedService.addProduct(this.productForm.value).subscribe({ next: (res) => {
        this.dialogRef.close({ value: 'add', data: this.productForm.value });
        this.productForm.reset();
        this.snackBarService.openSnackBar(
          'Product Added Succesfully!',
          'blue-snackbar'
        );
      },
      error: (error) => {
        this.snackBarService.openSnackBar('Error in creating Product!');
      },
    });
  }

  updateProduct() {
    this.sharedService
      .updateProduct({ ...this.productForm.value, id: this.productAddEditData.id })
      .subscribe({
        next: (res) => {
          this.dialogRef.close({
            value: 'update',
            data: this.productForm.value,
          });
          this.productForm.reset();
          this.snackBarService.openSnackBar(
            'Product updated Succesfully!',
            'blue-snackbar'
          );
        },
        error: (error) => {
          this.snackBarService.openSnackBar('Error in updating Product!');
        },
      });
  }
}
