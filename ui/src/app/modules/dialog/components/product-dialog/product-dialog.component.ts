import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { IProduct } from 'src/app/modules/product/product.model';
import { ProductService } from 'src/app/modules/product/service/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  public errorMessage: string;
  public columns: string[] = ['productId', 'name', 'type', 'interest','frequency', 'securedProduct'];
  public dataSource: MatTableDataSource<IProduct>;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
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
