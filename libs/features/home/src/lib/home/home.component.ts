import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [CommonModule, NzButtonModule, RouterModule],
  template: `
    <div class="home-container">
      <img src="/assets/chasing-ridges-logo.png" alt="Chasing Ridges Logo" class="logo">
      <div class="actions">
        <button nz-button nzType="primary" nzSize="large" routerLink="/products">
          View Products
        </button>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      gap: 2rem;
    }
    .logo {
      max-width: 400px;
      width: 100%;
      height: auto;
    }
    .actions {
      margin-top: 2rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
