import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
import { createComplex, createCourt, editComplex, selectComplex, uploadComplexImage, userComplex } from '../../store/actions/complex.action';
import { selectUser } from '../../store/selectors/user.selector';
import { myComplexes, selectedComplexID, selectedComplex } from '../../store/selectors/complex.selector';
import { combineLatest, combineLatestAll, filter, firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { ComplexGlobalStats, ComplexStatsMonth, ComplexStatsWeek } from '../../models/complex.stats';
import { ManagementService } from '../../services/management.service';

import { ChangeDetectionStrategy, model, signal } from '@angular/core';

import {
  MatDialog,
} from '@angular/material/dialog';
import { AddComplex } from '../add-complex/add-complex';
import { CreateComplex } from '../../models/create.complex.interface';
import { AddCourts } from '../add-courts/add-courts';
import { CreateCourt } from '../../models/create.court.interface';
import { LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-management',
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    AsyncPipe,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,
    NgxChartsModule
  ],
  templateUrl: './management.html',
  styleUrl: './management.scss'
})
export class Management {

  store = inject<Store<AppState>>(Store)
  user$: Subscription;
  private userId: number = -1;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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

  selectedStats: string = 'monthly';

  private prevId: number = -1;

  monthStats$!: Observable<ComplexStatsMonth>

  weekStats$!: Observable<ComplexStatsWeek>

  stats$!: Observable<{ month: ComplexStatsMonth; week: ComplexStatsWeek }>;

  globalStats$!: Observable<ComplexGlobalStats>

  modalAddComplex: Boolean = false;

  selected$ = this.store.select(selectedComplexID).pipe(
    filter(id => id != -1 && id != this.prevId)
  )
    .subscribe((e) => {
      this.prevId = e;

      this.monthStats$ = this.managementService.getMonhtStats(e)
      this.weekStats$ = this.managementService.getWeekStats(e)

      this.stats$ = combineLatest([
        this.monthStats$,
        this.weekStats$
      ]).pipe(
        map(([month, week]) => ({ month, week }))
      )


      this.monthStats$.subscribe((e) => console.log(e))
    })

  selectedComplex$ = this.store.select(selectedComplex)


  myComplex$ = this.store.select(myComplexes)

  selectComplex(id: number) {
    this.store.dispatch(selectComplex({ id }))
  }

  readonly dialog = inject(MatDialog);

  openDialogAddComplex() {
    const dialogRef = this.dialog.open(AddComplex, {
      data: {
        name: "",
        open_time: "",
        close_time: "",
        location: "",
        country: "",
        city: ""
      }
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



  async openDialogEditComplex(id: number) {
    this.selectComplex(id);

    const cmp = await firstValueFrom(this.selectedComplex$);

    const dialogReff = this.dialog.open(AddComplex, {
      data: {
        name: cmp!.name,
        location: `(${cmp!.location.x},${cmp!.location.y})`,
        open_time: cmp!.open_time,
        close_time: cmp!.close_time,
        city: cmp!.city,
        country: cmp!.country
      },
    });

    dialogReff.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result !== undefined && this.userId != -1) {
        let complex: CreateComplex = result;

        this.store.dispatch(editComplex({ complex, id }))
      }
    });
  }

  openDialogAddCourt(id: number) {

    this.selectComplex(id);

    const dialogReff = this.dialog.open(AddCourts);

    dialogReff.afterClosed().subscribe(result => {
      if (result !== undefined && this.userId != -1) {
        let court: CreateCourt = result;

        court.complex = id;
        this.store.dispatch(createCourt({ court }))
      }
    });
  }

  view: [number, number] = [400, 400];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  colorScheme = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#9e64fdff']
  };

  onFileSelected(event: Event, id: number) {

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.store.dispatch(uploadComplexImage({ file, id }));
    }
  }

}