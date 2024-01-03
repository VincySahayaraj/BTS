import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { ExtraRoutes } from './extra.routing';
import { AppIconsComponent } from './icons/icons.component';
import { AppSamplePageComponent } from './sample-page/sample-page.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { CountDetailsComponent } from './count-details/count-details.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SubclientComponent } from './subclient/subclient.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ExtraRoutes),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MaterialModule,
    FormsModule,
    MatInputModule,
    NgxSpinnerModule,
   
    NgApexchartsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    AppIconsComponent,
    AppSamplePageComponent,
    OrderdetailsComponent,
    CountDetailsComponent,
    SubclientComponent
  ],
})
export class ExtraModule {}
