import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  standalone: true,
  imports: [RouterModule, NzButtonModule, NzLayoutModule, NzMenuModule],
  selector: 'app-root',
  template: `
    <nz-layout class="app-layout">
      <nz-header>
        <div class="logo"></div>
        <ul nz-menu nzTheme="dark" nzMode="horizontal">
          <li nz-menu-item routerLink="/home" routerLinkActive="ant-menu-item-selected">Home</li>
          <li nz-menu-item routerLink="/products" routerLinkActive="ant-menu-item-selected">Products</li>
        </ul>
      </nz-header>
      <nz-content>
        <div class="inner-content">
          <router-outlet></router-outlet>
        </div>
      </nz-content>
      <nz-footer>Chasing Ridges ©2024</nz-footer>
    </nz-layout>
  `,
  styles: [`
    .app-layout {
      min-height: 100vh;
    }
    .logo {
      width: 120px;
      height: 31px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px 24px 16px 0;
      float: left;
    }
    .inner-content {
      padding: 24px;
      background: #fff;
      min-height: 360px;
    }
    nz-header {
      position: fixed;
      width: 100%;
      z-index: 1;
    }
    [nz-menu] {
      line-height: 64px;
    }
    nz-content {
      padding: 0 50px;
      margin-top: 64px;
    }
    nz-footer {
      text-align: center;
    }
  `]
})
export class AppComponent {
  title = 'chasing-ridges';
}
