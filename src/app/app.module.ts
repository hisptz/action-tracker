import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDhis2MenuModule } from '@hisptz/ngx-dhis2-menu';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { sharedModules } from './shared';
import { LegendSetComponent } from './components/legend-set/legend-set.component';

import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, LegendSetComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule.forRoot({
      namespace: 'iapps',
      version: 1,
      models: {
        users: 'id'
      }
    }),
    NgxDhis2HttpClientModule.forRoot({
      version: 1,
      namespace: 'actionTracker',
      models: {}
    }),

    /**
     * Menu  module
     */
    NgxDhis2MenuModule,
    /**
     * Shared Modules
     */
    ...sharedModules,

    /**
     * Translation module
     */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
