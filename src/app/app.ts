import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class App implements OnInit {
  protected readonly title = signal('angular-login-app');
  isLoading = signal(true);

  ngOnInit() {
    console.log('App initialized, starting loader timer');
    setTimeout(() => {
      console.log('Timer finished, hiding loader');
      this.isLoading.set(false);
    }, 3000);
  }
}
