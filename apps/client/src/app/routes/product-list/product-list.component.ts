import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { ManagementService } from '../services/management-service.service';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { IProduct } from '../../types/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputIconModule,
    IconFieldModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [MessageService],
})
export class ProductListComponent implements OnInit {
  products = signal<IProduct[]>([]);
  totalProducts = 0;
  currentPage = 1;
  rowsPerPage = 10;

  managementService = inject(ManagementService);
  messageService = inject(MessageService);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.managementService
      .getAllProducts(this.currentPage, this.rowsPerPage)
      .subscribe({
        next: (response) => {
          this.products.set(response.products);
          this.totalProducts = response.total;
        },
        error: () => {
          this.showError('Failed to fetch users. Please try again later.');
        },
      });
  }
  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.rowsPerPage = event.rows;
    this.loadProducts();
  }
  // onSearchChange(event: any) {
  //   const val = event.target.value as string;
  //   this.searchTerm.set(val);

  //   if (val === '') {
  //     this.filteredUsers.set(this.users());
  //   } else {
  //     const filtered = this.users().filter((user) =>
  //       user.name.toLowerCase().includes(val.toLowerCase())
  //     );
  //     this.filteredUsers.set(filtered);
  //   }
  // }

  onDeleteProduct(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.managementService.deleteProduct(id).subscribe({
          next: () => {
            this.showSuccess('product deleted successfully.');
            this.loadProducts(); // Reload the user list
          },
          error: () => {
            this.showError('Failed to delete user. Please try again later.');
          },
        });
      }
    });
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
