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
import { createComplex, createCourt, selectComplex, userComplex } from '../../store/actions/complex.action';
import { selectUser } from '../../store/selectors/user.selector';
import { myComplexes, selectedComplex } from '../../store/selectors/complex.selector';
import { filter, Observable, Subscription } from 'rxjs';
import { ComplexGlobalStats, ComplexStatsMonth, ComplexStatsWeek } from '../../models/complex.stats';
import { ManagementService } from '../../services/management.service';

import { ChangeDetectionStrategy, model, signal } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddComplex } from '../add-complex/add-complex';
import { CreateComplex } from '../../models/create.complex.interface';
import { AddCourts } from '../add-courts/add-courts';
import { CreateCourt } from '../../models/create.court.interface';

@Component({
  selector: 'app-management',
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    AsyncPipe,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule
  ],
  templateUrl: './management.html',
  styleUrl: './management.scss'
})
export class Management {

  store = inject<Store<AppState>>(Store)
  user$: Subscription;
  private userId: number = -1;

  constructor(private managementService: ManagementService) {
    this.user$ = this.store.select(selectUser)
      .subscribe((user) => {

        if (!user || user?.id == -1)
          return;

        this.userId = user.id
        this.store.dispatch(userComplex({ id: user.id }))
        this.globalStats$ = this.managementService.getGlobalStats(user.id)
      })
  }

  private prevId: number = -1;

  monthStats$!: Observable<ComplexStatsMonth>

  weekStats$!: Observable<ComplexStatsWeek>

  globalStats$!: Observable<ComplexGlobalStats>

  modalAddComplex: Boolean = false;

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

  readonly dialog = inject(MatDialog);

  openDialogAddComplex() {
    const dialogRef = this.dialog.open(AddComplex, {
      data: { open_time: Date, close_time: Date, name: String },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result !== undefined && this.userId != -1) {
        let complex: CreateComplex = result;

        complex.owner = this.userId
        this.store.dispatch(createComplex({ complex }))
      }
    });
  }


  openDialogAddCourt(id: number) {

    this.store.dispatch(selectComplex({ id }))

    const dialogReff = this.dialog.open(AddCourts, {
      data: { name: null, complex: null, price: null },
    });

    dialogReff.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result !== undefined && this.userId != -1) {
        let court: CreateCourt = result;

        court.complex = id;
        this.store.dispatch(createCourt({ court }))
      }
    });
  }

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

