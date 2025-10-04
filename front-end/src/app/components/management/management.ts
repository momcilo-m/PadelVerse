import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { selectComplex, userComplex } from '../../store/actions/complex.action';
import { selectUser } from '../../store/selectors/user.selector';
import { myComplexes, selectedComplex } from '../../store/selectors/complex.selector';
import { filter, Observable } from 'rxjs';
import { ComplexGlobalStats, ComplexStatsMonth, ComplexStatsWeek } from '../../models/complex.stats';
import { ManagementService } from '../../services/management.service';


@Component({
  selector: 'app-management',
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    AsyncPipe
  ],
  templateUrl: './management.html',
  styleUrl: './management.scss'
})
export class Management {

  store = inject<Store<AppState>>(Store)

  constructor(private managementService: ManagementService) { }

  private prevId: number = -1;

  monthStats$!: Observable<ComplexStatsMonth>

  weekStats$!: Observable<ComplexStatsWeek>

  globalStats$!: Observable<ComplexGlobalStats>

  user$ = this.store.select(selectUser)
    .subscribe((user) => {
      if (!user || user?.id == -1)
        return;

      this.store.dispatch(userComplex({ id: user.id }))
      this.globalStats$ = this.managementService.getGlobalStats(user.id)
    })

  selected$ = this.store.select(selectedComplex).pipe(
    filter(id => id != -1 && id != this.prevId)
  ).subscribe((e) => {
    this.prevId = e;

    this.monthStats$ = this.managementService.getMonhtStats(e)
    this.weekStats$ = this.managementService.getWeekStats(e)

  })


  myComplex$ = this.store.select(myComplexes)

  selectComplex(id: number) {
    this.store.dispatch(selectComplex({ id }))
  }

  // ngAfterContentInit() {
  //   console.log("AAA", this.userId)
  //   if (this.userId == -1)
  //     return;

  // }

}



//  monthStats: ComplexStatsMonth =
//     {
//       totalCount: -1,
//       totalAmount: -1,
//       amountPerWeek: [],
//       courtsCount: {},
//       user: {
//         topUser: -1,
//         count: -1
//       }
//     }

//   weekStats: ComplexStatsWeek =
//     {
//       courtsCount: {},
//       todayAmount: -1,
//       todayCount: -1,
//       totalAmount: -1,
//       totalCount: -1
//     }

