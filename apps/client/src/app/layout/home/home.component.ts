import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.states';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user$!: Observable<{ name: string; email: string } | null>;

  dropdownVisible = false;

  private _router = inject(Router);
  private _elementRef = inject(ElementRef);
  private _store = inject(Store<AppState>);

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  signOut() {
    localStorage.removeItem('authToken');
    this._store.dispatch(logout());
    this._router.navigateByUrl('/login');
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.dropdownVisible = false;
    }
  }
}

function logout(): any {
  throw new Error('Function not implemented.');
}
