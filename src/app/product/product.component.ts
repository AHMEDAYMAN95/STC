import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../services/shared.service';
import { ProductData } from 'src/_models/userModel';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'stc-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  allDataProducts: ProductData[] = [];
  categories = ["men's clothing", "jewelery", "electronics", "women's clothing",];

  displayedColumns: string[] = ['index', 'title', 'category', 'price', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  modeEdit = false;

  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, public translate: TranslateService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.productForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      count: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  getAllProduct() {
    this.sharedService.get('https://fakestoreapi.com/products').subscribe(dataProduct => {
      this.allDataProducts = dataProduct;
      this.viewProductList();
    })
  }

  viewProductList() {
    this.dataSource = new MatTableDataSource(this.allDataProducts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Filter & Search
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Products() {
    if (!this.modeEdit)
      this.submitForm();
    else
      this.updateProduct();
  }

  submitForm() {
    this.sharedService.post('https://fakestoreapi.com/products', this.productForm.value).subscribe(data => {
      this.reset();
      this.getAllProduct();
    },
      error => {
        if (error) {
          alert('Saved successfully')
        }
      });
  }

  updateProduct() {
    this.sharedService.put('https://fakestoreapi.com/products/' + this.productForm.value.id, this.productForm.value).subscribe(result => {
      this.reset();
      this.getAllProduct();
    },
      error => {
        if (error) {
          alert('Updated successfully')
        }
      });
  }

  editProduct(element) {
    this.modeEdit = true;
    this.productForm.patchValue({
      id: element.id,
      title: element.title,
      category: element.category,
      price: element.price,
      count: element.count,
      image: element.image,
      description: element.description
    })
  }

  deleteProdect(element) {
    debugger
    this.sharedService.delete('https://fakestoreapi.com/products/' + element.id).subscribe(result => {
      this.reset();
      this.getAllProduct();
    },
      error => {
        if (error) {
          alert('Deleted successfully')
        }
      });
  }

  reset() {
    this.productForm.reset();
    (Object as any).values(this.productForm.controls).forEach((control: FormControl) => {
      control.setErrors(null);
    });
  }
}
