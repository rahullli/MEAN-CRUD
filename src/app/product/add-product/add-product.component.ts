import { Component, OnInit , OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  @Output() newItemEvent = new EventEmitter<Product[]>();
  sub$?: Subscription;
  productForm?: FormGroup;
  constructor(private productService: ProductService , private fb: FormBuilder ) { }

  ngOnInit(): void {
      this.productForm = this.fb.group({
          productName: ['', Validators.required],
          description: [''],
          price: ['', Validators.required]

      });
  }

  onSubmit() {

    if (this.productForm?.valid) {

      // let productName = this.productForm?.get("name")?.value;

      this.sub$ = this.productService.createProduct(this.productForm.value).subscribe({

        next: (data) => {
          console.log('success');
          this.newItemEvent.emit(data);
        },

        error: (err) => console.error(err)

      })

    }

    else {

      console.log("Validation Failed")

    }

  }
}
