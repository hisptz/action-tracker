import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionFilterComponent } from './intervention-filter.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from 'src/app/core/store/reducers';
import { effects } from 'src/app/core/store/effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('InterventionFilterComponent', () => {
  let component: InterventionFilterComponent;
  let fixture: ComponentFixture<InterventionFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot(effects)
      ],
      declarations: [InterventionFilterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
