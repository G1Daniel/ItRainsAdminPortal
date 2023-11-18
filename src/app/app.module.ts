import { HamlaDialogComponent } from './admin/hamla/hamla-dialog/hamla-dialog.component';
import { HamlaComponent } from './admin/hamla/hamla.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';

import { OverlayContainer, Overlay } from '@angular/cdk/overlay';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { menuScrollStrategy } from './theme/utils/scroll-strategy';

import { environment } from 'src/environments/environment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, environment.url +'/assets/i18n/', '.json');
}

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TopMenuComponent } from './theme/components/top-menu/top-menu.component';
import { MenuComponent } from './theme/components/menu/menu.component';
import { SidenavMenuComponent } from './theme/components/sidenav-menu/sidenav-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';

import { AppSettings } from './app.settings';
import { AppService } from './app.service';
import { AppInterceptor } from './theme/utils/app-interceptor';
import { OptionsComponent } from './theme/components/options/options.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { AgentsComponent } from './admin/agents/agents.component';
import { AgentsDialogComponent } from './admin/agents/agents-dialog/agents-dialog.component';
import { PersonsDialogComponent } from './admin/persons/persons-dialog/persons-dialog.component';
import { PersonsComponent } from './admin/persons/persons.component';
import { RegionsDialogComponent } from './admin/regions/regions-dialog/regions-dialog.component';
import { RegionsComponent } from './admin/regions/regions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { firebaseConfig } from './firebase.config';
import { AccommodationCustomerComponent } from './admin/accommodation-customer/accommodation-customer.component';
import { AccommodationCustomerDialogComponent } from './admin/accommodation-customer/accommodationCustomer-dialog/accommodation-customer-dialog/accommodation-customer-dialog.component';
import { AccommodationDialogComponent } from './admin/accommodation/accommodation-dialog/accommodation-dialog/accommodation-dialog.component';
import { AccommodationComponent } from './admin/accommodation/accommodation.component';
import { CitiesDialogComponent } from './admin/cities/cities-dialog/cities-dialog.component';
import { CitiesComponent } from './admin/cities/cities.component';
import { StatesDialogComponent } from './admin/states/states-dialog/states-dialog.component';
import { StatesComponent } from './admin/states/states.component';
import { CountryDialogComponent } from './admin/country/country-dialog/country-dialog.component';
import { CountryComponent } from './admin/country/country.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { QRCodeModule } from 'angularx-qrcode';
import { QrCodeDialogComponent } from './admin/persons/qrcode/qr-code-dialog/qr-code-dialog.component';
import { DeliveryTypesComponent } from './admin/delivery-types/delivery-types.component';
import { DeliveryTypesDialogComponent } from './admin/delivery-types/delivery-types-dialog/delivery-types-dialog.component';
import { DonationTypesDialogComponent } from './admin/donation-types/donation-types-dialog/donation-types-dialog.component';
import { DonationTypesComponent } from './admin/donation-types/donation-types.component';
import { NewsDialogComponent } from './admin/news/news-dialog/news-dialog.component';
import { NewsComponent } from './admin/news/news.component';
import { DonationsDialogComponent } from './admin/donations/donations-dialog/donations-dialog.component';
import { DonationsComponent } from './admin/donations/donations.component';
import { CompanyDialogComponent } from './admin/company/company-dialog/company-dialog.component';
import { CompanyComponent } from './admin/company/company.component';
import { RequestDialogComponent } from './admin/requests/request-dialog/request-dialog.component';
import { RequestsComponent } from './admin/requests/requests.component';
import { LoginComponent } from './login/login.component';
import { PaymentReportsComponent } from './admin/payment-reports/payment-reports.component';
import { PaymentReportDialogComponent } from './admin/payment-reports/payment-report-dialog/payment-report-dialog.component';
import { AvailableDonationsComponent } from './admin/available-donations/available-donations.component';
import { ObtainedObtainedDonationsComponent } from './admin/obtained-donations/obtained-donations.component';
import { OfferedRequestsComponent } from './admin/offered-requests/offered-requests.component';
import { NotificationDialogComponent } from './admin/notifications/notification-dialog/notification-dialog.component';
import { NotificationsComponent } from './admin/notifications/notifications.component';

@NgModule({
   imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAO7Mg2Cs1qzo_3jkKkZAKY6jtwIlm41-I'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    QRCodeModule
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    TopMenuComponent,
    MenuComponent,
    SidenavMenuComponent,
    BreadcrumbComponent,
    OptionsComponent,
    FooterComponent  ,
    AgentsComponent,
    AgentsDialogComponent,
    PersonsComponent,
    PersonsDialogComponent,
    AccommodationComponent,
    AccommodationCustomerComponent,
    AccommodationDialogComponent,
    AccommodationCustomerDialogComponent,
    RegionsComponent,
    RegionsDialogComponent,
    CitiesComponent,
    CitiesDialogComponent,
    StatesComponent,
    StatesDialogComponent,
    CountryComponent,
    CountryDialogComponent,
    LoadingSpinnerComponent,
    HamlaComponent,
    HamlaDialogComponent,
    QrCodeDialogComponent,
    DeliveryTypesComponent,
    DeliveryTypesDialogComponent,
    DonationTypesComponent,
    DonationTypesDialogComponent,
    NewsComponent,
    NewsDialogComponent,
    DonationsComponent,
    DonationsDialogComponent,
    CompanyComponent,
    CompanyDialogComponent,
    RequestsComponent,
    RequestDialogComponent,
    LoginComponent,
    PaymentReportsComponent,
    PaymentReportDialogComponent,
    AvailableDonationsComponent,
    ObtainedObtainedDonationsComponent,
    OfferedRequestsComponent,
    NotificationsComponent,
    NotificationDialogComponent,
  ],
  providers: [
    AppSettings,
    AppService,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: MAT_MENU_SCROLL_STRATEGY, useFactory: menuScrollStrategy, deps: [Overlay] },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
