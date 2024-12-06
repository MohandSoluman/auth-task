import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  imports: [HomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
})
export class AppComponent {
  title = 'client';
}
