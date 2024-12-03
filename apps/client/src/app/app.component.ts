import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { SignupComponent } from './routes/signup/signup.component';

@Component({
  standalone: true,
  imports: [HomeComponent, RouterModule, SignupComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';
}
