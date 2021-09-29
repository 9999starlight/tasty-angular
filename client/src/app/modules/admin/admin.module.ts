import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { OverviewComponent } from './overview/overview.component';
import { UsersComponent } from './users/users.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CommentsComponent } from './comments/comments.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBook, faChartBar, faComments, faUsers } from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from '../shared/shared.module';
import { StatisticBoxComponent } from './statistic-box/statistic-box.component';
import { StatisticBarsComponent } from './statistic-box/statistic-bars/statistic-bars.component';


@NgModule({
  declarations: [
    AdminHomeComponent,
    OverviewComponent,
    UsersComponent,
    RecipesComponent,
    CommentsComponent,
    NavigationComponent,
    StatisticBoxComponent,
    StatisticBarsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class AdminModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faUsers, faComments, faChartBar, faBook);
  }
}
