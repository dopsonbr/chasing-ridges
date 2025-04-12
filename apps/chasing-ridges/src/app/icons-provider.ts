import { NzIconModule } from 'ng-zorro-antd/icon';

export function provideNzIcons() {
  return {
    provide: NzIconModule,
    useValue: NzIconModule.forRoot([])
  };
} 