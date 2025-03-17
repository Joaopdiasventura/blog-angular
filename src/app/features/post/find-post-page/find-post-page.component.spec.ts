import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPostPageComponent } from './find-post-page.component';

describe('FindPostPageComponent', () => {
  let component: FindPostPageComponent;
  let fixture: ComponentFixture<FindPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindPostPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
