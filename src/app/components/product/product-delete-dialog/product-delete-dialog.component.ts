import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';
import { SnackBarService } from 'src/app/services/snackBar.service';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.scss'],
})
export class ProductDeleteDialogComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public productId: number,
    private snackBarService: SnackBarService,
    private dialogRef: MatDialogRef<ProductDeleteDialogComponent>
  ) { }

  ngOnInit(): void { }

  deleteProduct() {
    this.sharedService.deleteProduct(this.productId).subscribe({
      next: () => {
        this.dialogRef.close('delete');
        this.snackBarService.openSnackBar('product deleted succefully');
      },
    });
  }
}
