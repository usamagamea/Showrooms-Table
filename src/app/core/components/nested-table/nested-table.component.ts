import {
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
import { CarShowroom } from '../../models/interface/CarShowroom';
import { columns } from '../../models/constants/columns';
import { Subscription } from 'rxjs';


@Component({
  selector: 'nested-table',
  standalone: true,
  imports: [CommonModule, MaterialModule],
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
export class NestedTableComponent implements OnInit , OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChildren('innerTable') innerTable!: QueryList<MatTable<any>>;
  @ViewChildren('innerSort') innerSort!: QueryList<MatSort>;

  readonly #dataService = inject(DataService);
  readonly #cdr = inject(ChangeDetectorRef);
 

  subscription = new Subscription();
  dataSource!: MatTableDataSource<CarShowroom>;
  columnsToDisplay = columns;
  nestedToDisplay = columns;
  expandedElement!: CarShowroom | null;
  companyList!: CarShowroom|any;
  nestedData!: CarShowroom|any;


  ngOnInit(): void {
    this.loadMainData();
   // call for test
    this.loadNestedData(20998);
  }
  private loadMainData(): void {
    this.subscription.add(
      this.#dataService.getData().subscribe((response) => {
      this.companyList = response;
      this.dataSource = new MatTableDataSource(this.companyList.response.data);
      this.dataSource.sort = this.sort;
    }));
  }

  private  loadNestedData(id:number): void {
    this.subscription.add(
      this.#dataService.getNestedData(id).subscribe(
        response => {
          this.nestedData = response;
          console.log('Nested data loaded:',this.nestedData);
          this.expandedElement = this.nestedData.response.data;
        }
      )
    );
  }

 protected getColumnKeys(): string[] {
    if (this.companyList?.response?.data.length > 0) {
      return Object.keys(this.companyList.response.data[0]);
    }
    return [];
  }

  protected toggle(element: CarShowroom) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.loadNestedData(element.response[0].data[0].id);
    this.innerTable.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<CarShowroom>).sort =
          this.innerSort.toArray()[index])
    );
    this.#cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
