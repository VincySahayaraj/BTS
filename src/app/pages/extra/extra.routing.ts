import { Routes } from '@angular/router';


// pages
import { AppIconsComponent } from './icons/icons.component';
import { AppSamplePageComponent } from './sample-page/sample-page.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { CountDetailsComponent } from './count-details/count-details.component';
import { SubclientComponent } from './subclient/subclient.component';

export const ExtraRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'icons',
        component: AppIconsComponent,
      },
      {
        path: 'sample-page',
        component: AppSamplePageComponent,
      },
      {
        path: 'orderdetails',
        component: OrderdetailsComponent,
      },
      {
        path: 'countdetails',
        component: CountDetailsComponent,
      },
      {
        path: 'subclientdetails',
        component: SubclientComponent,
      },
    ],
  },
];
