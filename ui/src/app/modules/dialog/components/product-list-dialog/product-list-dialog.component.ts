import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from 'src/app/modules/product/product.model';
import { ProductService } from 'src/app/modules/product/service/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-list-dialog.component.html',
  styleUrls: ['./product-list-dialog.component.scss']
})
export class ProductListDialogComponent implements OnInit {

  public errorMessage: string;
  public columns: string[] = ['productId', 'name', 'type', 'interest','frequency', 'securedProduct'];
  public dataSource: MatTableDataSource<IProduct>;

  constructor(
    public dialogRef: MatDialogRef<ProductListDialogComponent>,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    }, error => {
      console.log(error);
    })
  }

  select(product: IProduct) {
    this.dialogRef.close(product);
  }

  close() {
    this.dialogRef.close();
  }

}
