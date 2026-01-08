import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeThumbnail } from './recipe-thumbnail';

describe('RecipeThumbnail', () => {
  let component: RecipeThumbnail;
  let fixture: ComponentFixture<RecipeThumbnail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeThumbnail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeThumbnail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
