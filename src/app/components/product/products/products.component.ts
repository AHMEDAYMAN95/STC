import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Product } from 'src/app/models/productModel';
import { SharedService } from 'src/app/services/shared.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteDialogComponent } from '../product-delete-dialog/product-delete-dialog.component';
import { ProductAddEditDialogComponent } from '../product-add-edit-dialog/product-add-edit-dialog.component';

@Component({
  selector: 'stc-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductComponent implements OnInit {

  title = 'STC Store | Product';
  products: Product[] = [];
  displayedColumns: string[] = ['index', 'title', 'price', 'category', 'image', 'actions'];
  dataSource = new MatTableDataSource<Product>(this.products);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private sharedService: SharedService, public translate: TranslateService, private titleService: Title,
    public dialog: MatDialog, private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.getAllProducts();
  }

  getAllProducts() {
    this.loaderService.isLoading = true;
    this.sharedService.getProducts().subscribe((data) => {
      this.products = data;
      this.dataSource.data = this.products;
      this.dataSource.paginator = this.paginator;
      this.loaderService.isLoading = false;
    });
  }

  addProduct() {
    this.dialog
      .open(ProductAddEditDialogComponent, {
        minWidth: '50%',
      })
      .afterClosed()
      .subscribe((result: { value: string; data: Product }) => {
        if (result.value == 'add') {
          this.dataSource.data = [
            ...this.dataSource.data,
            { ...result.data, id: this.generateRandomId() },
          ];
        }
      });
  }

  editProduct(product: Product) {
    this.dialog
      .open(ProductAddEditDialogComponent, {
        minWidth: '50%',
        data: { ...product },
      })
      .afterClosed()
      .subscribe((result: { value: string; data: Product }) => {
        if (result.value == 'update') {
          let copiedProducts = this.products;
          let foundProductIndex = this.dataSource.data.findIndex(
            (foundProduct) => foundProduct.id === product.id
          );

          copiedProducts[foundProductIndex] = {
            ...result.data,
            id: product.id,
          };
          this.dataSource.data = copiedProducts;
        }
      });
  }

  deleteProduct(productId: number) {
    this.dialog
      .open(ProductDeleteDialogComponent, {
        minWidth: '30%',
        data: productId,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == 'delete') {
          this.dataSource.data = this.products.filter(
            (product) => product.id !== productId
          );
        }
      });
  }

  generateRandomId() {
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomDecimal = Math.random(); // Generate a random decimal between 0 and 1
    const randomNumber = Math.floor(randomDecimal * 1000000); // Convert the random decimal to a 6-digit number
    const randomId = Number(`${timestamp}${randomNumber}`); // Concatenate timestamp and random number

    return randomId;
  }

  // Filter & Search
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
