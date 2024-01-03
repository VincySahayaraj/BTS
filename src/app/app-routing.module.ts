import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { OrderdetailsComponent } from './pages/extra/orderdetails/orderdetails.component';
import { CountDetailsComponent } from './pages/extra/count-details/count-details.component';
import { SubclientComponent } from './pages/extra/subclient/subclient.component';
import { AppSideLoginComponent } from './pages/authentication/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [

      {
        path: '',
        // redirectTo: '/login',
        loadChildren: () =>
               import('./pages/authentication/authentication.module').then(
                   (m) => m.AuthenticationModule
                 ),
        component:AppSideLoginComponent,
        pathMatch: 'full',
      },
        {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      {
        path: 'orderdetails',
        canActivate:[AuthGuard],
        component:OrderdetailsComponent,
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      {
        path: 'countdetails',
        canActivate:[AuthGuard],
        component:CountDetailsComponent,
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      {
        path: 'subclientdetails',
        canActivate:[AuthGuard],
        component:SubclientComponent,
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
    ],
  },
  // {
  //   path: '',
  //   redirectTo:'/login',
  //   component: BlankComponent,
  //   children: [
  //     {
  //       path: 'authentication',
  //       loadChildren: () =>
  //         import('./pages/authentication/authentication.module').then(
  //           (m) => m.AuthenticationModule
  //         ),
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
