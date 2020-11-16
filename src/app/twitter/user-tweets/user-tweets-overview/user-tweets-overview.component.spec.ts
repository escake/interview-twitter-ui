import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTweetsOverviewComponent } from './user-tweets-overview.component';

describe('UserTweetsOverviewComponent', () => {
  let component: UserTweetsOverviewComponent;
  let fixture: ComponentFixture<UserTweetsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTweetsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTweetsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
