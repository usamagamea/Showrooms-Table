import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DataService } from '../../services/data.service';
import { CarShowroom, DataTable } from '../../models/interface/CarShowroom';
import { columns } from '../../models/constants/columns';
import { Subscription } from 'rxjs';
import { ExpandedDetailsComponent } from '../expanded-details/expanded-details.component';

@Component({
  selector: 'nested-table',
  standalone: true,
  imports: [CommonModule, MaterialModule, ExpandedDetailsComponent],
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class NestedTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChildren('innerTable') innerTable!: QueryList<MatTable<any>>;
  @ViewChildren('innerSort') innerSort!: QueryList<MatSort>;

  readonly #dataService = inject(DataService);
  readonly #cdr = inject(ChangeDetectorRef);

  dataSource!: MatTableDataSource<CarShowroom>;
  dataNestedSource!: MatTableDataSource<any>;
  subscription = new Subscription();
  nestedToDisplay = columns;
  expandedElement!: DataTable | null;
  companyList!: CarShowroom | any;
  nestedItems: any;

  ngOnInit(): void {
    this.loadMainData();
  }
  private loadMainData(): void {
    this.subscription.add(
      this.#dataService.getData().subscribe((response) => {
        this.companyList = response;
        this.dataSource = new MatTableDataSource(
          this.companyList.response.data
        );
        this.dataSource.sort = this.sort;
      })
    );
  }

  private loadNestedData(id: number): void {
    this.subscription.add(
      this.#dataService.getNestedData(id).subscribe((response) => {
        let nestedData = response;
        this.nestedItems = nestedData.response.requestItems[0];
        if (Array.isArray(this.nestedItems)) {
          this.companyList.forEach((company: DataTable) => {
            if (company.id === id) {
              company.requestItems = this.nestedItems;
            }
          });
          this.dataNestedSource = new MatTableDataSource(this.nestedItems);
        }
        console.log('nested data', this.nestedItems);
        this.#cdr.detectChanges();
      })
    );
  }

  protected toggle(element: DataTable) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.loadNestedData(element.id);
    this.#cdr.detectChanges();
  }

  protected getColumnKeys(): string[] {
    if (this.companyList?.response?.data.length > 0) {
      return Object.keys(this.companyList.response.data[0]);
    }
    return [];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
