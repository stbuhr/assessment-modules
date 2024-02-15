import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleFrameComponent } from './module-frame.component';

describe('ModuleFrameComponent', () => {
  let component: ModuleFrameComponent;
  let fixture: ComponentFixture<ModuleFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleFrameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
