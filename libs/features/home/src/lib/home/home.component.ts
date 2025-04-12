import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [CommonModule, NzButtonModule, RouterModule],
  template: `
    <div class="home-container" data-testid="home-container">
      <img 
        src="/assets/chasing-ridges-logo.png" 
        alt="Chasing Ridges Logo" 
        class="logo"
        data-testid="logo">
      <div class="actions" data-testid="actions-container">
        <button 
          nz-button 
          nzType="primary" 
          nzSize="large" 
          routerLink="/products"
          data-testid="view-products-button">
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
