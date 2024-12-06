import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ManagementService } from '../services/management-service.service';
import { IProduct } from '../../types/product';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-user-managment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    InputIconModule,
    ToastModule,
    IconFieldModule,
  ],
  templateUrl: './product-managment.component.html',
  styleUrl: './product-managment.component.css',
  providers: [MessageService],
})
export class ProductManagmentComponent implements OnInit {
  productId: string | null = null;
  form!: FormGroup;

  product?: IProduct;

  private _route = inject(ActivatedRoute);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _managementService = inject(ManagementService);
  private _messageService = inject(MessageService);

  ngOnInit(): void {
    this.initForm();
    this.productId = this._route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.getProductById(this.productId);
    }
  }

  getProductById(id: string) {
    this._managementService.getProductById(id).subscribe({
      next: (product) => {
        console.log(product);
        this.product = product;
        this.form.patchValue(this.product);
      },
      error: () => {
        this.showError();
      },
    });
  }

  initForm() {
    this.form = this._fb.group({
      id: [''],
      name: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      code: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
    });
  }
  submitForm() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: IProduct = {
      ...this.form.value,
    };

    if (this.productId) {
      this._managementService.updateProduct(this.productId, data).subscribe({
        next: () => {
          this.showSuccess('Product updated successfully.');
          this.redirectToProducts();
        },
        error: () => {
          this.showError();
        },
      });
    } else {
      this._managementService.addProduct(data).subscribe({
        next: () => {
          this.showSuccess('product added successfully.');
          this.redirectToProducts();
        },
        error: () => {
          this.showError();
        },
      });
    }
  }
  discard() {
    this.form.reset();
    this._router.navigateByUrl('/products');
  }

  redirectToProducts() {
    this._router.navigateByUrl('/products').then(() => {
      window.location.reload();
    });
  }

  showError() {
    this._messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong',
    });
  }

  showSuccess(message: string) {
    this._messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
}
