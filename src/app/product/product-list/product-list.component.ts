import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit , OnDestroy {

  
  products: Product[] = [];
  sub$?: Subscription;
  canAdd: boolean = true;
  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.sub$ = this.productService.getProducts().subscribe({
       next: (data) => {
    console.log("productList", data);
        
        this.products = data
    console.log("productList -->",  this.products );
      
      }, 
       error: (error) => console.log(error)
    })
    
  }

  deleteItem(id : string)  {
     this.productService.deleteProduct(id).subscribe({
      next: () => console.log('success deleting data'),
      error: (err) => console.error(err)
    })
  }

  updateItem(p : any){
    this.productService.updateProduct(p).subscribe({
      next: () => console.log('success deleting data'),
      error: (err) => console.error(err)
    })
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }

}
