import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../routes/services/auth.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private _router = inject(Router);
  private _elementRef = inject(ElementRef);
  private _authService = inject(AuthService);

  currentUser$: Observable<User | null>;
  userLoggedIn = false;
  dropdownVisible = false;

  constructor() {
    this.currentUser$ = this._authService.currentUser$;
  }

  ngOnInit(): void {
    this.currentUser$.subscribe((user) => {
      this.userLoggedIn = !!user;
    });
  }
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  signInOut() {
    sessionStorage.removeItem('token');
    this._router.navigateByUrl('/login');
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.dropdownVisible = false;
    }
  }
}
