import { HamlaComponent } from './hamla/hamla.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { InputFileConfig, InputFileModule } from 'ngx-input-file';
const config: InputFileConfig = {
  fileAccept: '*'
};

import { AdminComponent } from './admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { FullScreenComponent } from './components/fullscreen/fullscreen.component';
import { MessagesComponent } from './components/messages/messages.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AgentsComponent } from './agents/agents.component';
import { AgentsDialogComponent } from './agents/agents-dialog/agents-dialog.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonsDialogComponent } from './persons/persons-dialog/persons-dialog.component';
import { RegionsComponent } from './regions/regions.component';
import { RegionsDialogComponent } from './regions/regions-dialog/regions-dialog.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AccommodationCustomerComponent } from './accommodation-customer/accommodation-customer.component';
import { AccommodationDialogComponent } from './accommodation/accommodation-dialog/accommodation-dialog/accommodation-dialog.component';
import { AccommodationCustomerDialogComponent } from './accommodation-customer/accommodationCustomer-dialog/accommodation-customer-dialog/accommodation-customer-dialog.component';
import { CitiesComponent } from './cities/cities.component';
import { StatesComponent } from './states/states.component';
import { StatesDialogComponent } from './states/states-dialog/states-dialog.component';
import { CountryComponent } from './country/country.component';
import { CountryDialogComponent } from './country/country-dialog/country-dialog.component';
import { DeliveryTypesComponent } from './delivery-types/delivery-types.component';
import { DeliveryTypesDialogComponent } from './delivery-types/delivery-types-dialog/delivery-types-dialog.component';
import { DonationTypesComponent } from './donation-types/donation-types.component';
import { DonationTypesDialogComponent } from './donation-types/donation-types-dialog/donation-types-dialog.component';
import { NewsComponent } from './news/news.component';
import { NewsDialogComponent } from './news/news-dialog/news-dialog.component';
import { DonationsComponent } from './donations/donations.component';
import { DonationsDialogComponent } from './donations/donations-dialog/donations-dialog.component';
import { CompanyComponent } from './company/company.component';
import { CompanyDialogComponent } from './company/company-dialog/company-dialog.component';
import { RequestsComponent } from './requests/requests.component';
import { RequestDialogComponent } from './requests/request-dialog/request-dialog.component';
import { PaymentReportsComponent } from './payment-reports/payment-reports.component';
import { PaymentReportDialogComponent } from './payment-reports/payment-report-dialog/payment-report-dialog.component';
import { AvailableDonationsComponent } from './available-donations/available-donations.component';
import { ObtainedObtainedDonationsComponent } from './obtained-donations/obtained-donations.component';
import { OfferedRequestsComponent } from './offered-requests/offered-requests.component';
import { AuthGGuard } from '../login/auth-g.guard';
import { NotificationsComponent } from './notifications/notifications.component';

export const routes = [
  {
    path: '',
    component: AdminComponent, children: [
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),data: {  expectedRoles: ['admin','charity']},canActivate:[AuthGGuard]},
      { path: 'delivery-types', component:DeliveryTypesComponent, data: { breadcrumb: 'Delivery Types',expectedRoles: ['admin'] } ,canActivate:[AuthGGuard]},
      { path: 'donation-types', component:DonationTypesComponent, data: { breadcrumb: 'Donation Types',expectedRoles: ['admin'] } ,canActivate:[AuthGGuard]},
      { path: 'news', component:NewsComponent, data: { breadcrumb: 'News',expectedRoles: ['admin'] } ,canActivate:[AuthGGuard]},
      { path: 'notifications', component:NotificationsComponent, data: { breadcrumb: 'Notifications',expectedRoles: ['admin'] } ,canActivate:[AuthGGuard]},
      { path: 'donations', component:DonationsComponent, data: { breadcrumb: 'Donations',expectedRoles: ['admin'] } ,canActivate:[AuthGGuard]},
      { path: 'companies', component:CompanyComponent, data: { breadcrumb: 'Companies',expectedRoles: ['admin']} ,canActivate:[AuthGGuard]},
      { path: 'requests', component:RequestsComponent, data: { breadcrumb: 'Requests',expectedRoles: ['admin'] } ,canActivate:[AuthGGuard]},
      { path: 'payment-reports', component:PaymentReportsComponent, data: { breadcrumb: 'Payment Reports',expectedRoles: ['admin']} ,canActivate:[AuthGGuard]},
      { path: 'available-donations', component:AvailableDonationsComponent, data: { breadcrumb: 'Requests',expectedRoles: ['charity']} ,canActivate:[AuthGGuard]},
      { path: 'obtained-donations', component:ObtainedObtainedDonationsComponent, data: { breadcrumb: 'Obtained Donations',expectedRoles: ['admin'] } ,canActivate:[AuthGGuard]},
      { path: 'offered-requests', component:OfferedRequestsComponent, data: { breadcrumb: 'Offred Requests',expectedRoles: ['charity']} ,canActivate:[AuthGGuard]},
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    UserMenuComponent,
    FullScreenComponent,
    MessagesComponent,
    BreadcrumbComponent,



    //AgentsComponent,
    //AgentsDialogComponent,
    //PersonsComponent,
    //PersonsDialogComponent,
    // AccommodationComponent,
    // AccommodationCustomerComponent,
    // AccommodationDialogComponent,
    // AccommodationCustomerDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InputFileModule.forRoot(config),

  ]
})
export class AdminModule { }
