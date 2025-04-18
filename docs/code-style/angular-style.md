# Angular Style Guidelines

## Core Architecture

### Standalone Components
- Prefer standalone components over NgModules
- Use standalone components for better tree-shaking
- Import dependencies directly in components
- Utilize standalone directives and pipes
- prefer on push change detection
- prefer to use ant design components instead of creating new
- add relevant `data-testid` attributes to elements that can be interacted with

```typescript
// ✅ Good
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: '...'
})
export class UserProfileComponent { }

// ❌ Avoid
@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule]
})
export class UserProfileModule { }
```

### Signals
- Use signals for reactive state management
- Prefer computed() for derived state
- Use effect() for side effects
- Consider signals over BehaviorSubject

```typescript
// ✅ Good
export class UserComponent {
  readonly user = signal<User | null>(null);
  readonly isAdmin = computed(() => this.user()?.role === 'admin');
  
  effect(() => {
    if (this.isAdmin()) {
      this.loadAdminFeatures();
    }
  });
}

// ❌ Avoid
export class UserComponent {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
}
```

### Reactive Forms
- Always use Reactive Forms over Template Forms
- Type form controls using generics
- Use form builders for complex forms
- Implement proper validation

```typescript
// ✅ Good
export class UserFormComponent {
  userForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder) {}
}

// ❌ Avoid
export class UserFormComponent {
  @ViewChild('form') form!: NgForm;
}
```

## Component Best Practices

### Component Structure
- Keep templates focused and small
- Use OnPush change detection strategy
- Implement proper lifecycle hooks
- Follow single responsibility principle

```typescript
// ✅ Good
@Component({
  selector: 'app-user-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, OnDestroy {
  users = signal<User[]>([]);
  
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    // Initialize component
  }
  
  ngOnDestroy(): void {
    // Cleanup
  }
}
```

### Component Communication
- Use Input() and Output() decorators
- Implement proper type safety
- Use EventEmitter for events
- Consider using signals for complex state sharing

```typescript
// ✅ Good
@Component({
  standalone: true
})
export class UserCardComponent {
  @Input({ required: true }) user!: User;
  @Output() userSelected = new EventEmitter<User>();
}
```

## Data Management

### HTTP Requests
- Use typed HTTP clients
- Implement proper error handling
- Use interceptors for common operations
- Consider caching strategies

```typescript
// ✅ Good
export class UserService {
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
```

### State Management
- Use signals for local state
- Consider @ngrx/component-store for feature state
- Use NgRx store for complex application state
- Implement proper state immutability

## Performance

### Change Detection
- Use OnPush strategy
- Avoid methods in templates
- Use pure pipes for transformations
- Implement trackBy for ngFor

```typescript
// ✅ Good
@Component({
  template: `
    <div *ngFor="let item of items(); trackBy: trackById">
      {{ item | customPipe }}
    </div>
  `
})
export class ListComponent {
  items = signal<Item[]>([]);
  trackById = (index: number, item: Item) => item.id;
}
```

### Lazy Loading
- Implement proper route lazy loading
- Use standalone components for better tree shaking
- Consider preloading strategies
- Lazy load heavy dependencies

```typescript
// ✅ Good
const routes: Routes = [{
  path: 'admin',
  loadComponent: () => import('./admin/admin.component')
    .then(m => m.AdminComponent)
}];
```

## Testing

### Unit Tests
- Test components in isolation
- Use TestBed configuration
- Mock dependencies properly
- Test edge cases and error scenarios

```typescript
// ✅ Good
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();
  });
});
```

## Error Handling

### Global Error Handling
- Implement ErrorHandler
- Use proper error boundaries
- Log errors appropriately
- Provide user-friendly error messages

```typescript
// ✅ Good
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    console.error('An error occurred:', error);
    // Log to service
    // Show user-friendly message
  }
}
```

Remember: These guidelines align with Angular's official documentation and best practices. Always consider the specific needs of your project while following these patterns.