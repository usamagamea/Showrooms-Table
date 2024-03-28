import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ViewChildren,
  inject,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { Subscription } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'expanded-details',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './expanded-details.component.html',
})
export class ExpandedDetailsComponent implements OnChanges, OnDestroy {
  @Input() id!: number;
  @ViewChildren('innerTable') innerTable!: QueryList<MatTable<any>>;

  readonly #dataService = inject(DataService);
  readonly #cdr = inject(ChangeDetectorRef);

  nestedData: any;
  nestedItems: any;
  subscription = new Subscription();
  dataNestedSource!: MatTableDataSource<any>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.loadNestedData(this.id);
    }
  }
  private loadNestedData(id: number): void {
    this.subscription.add(
      this.#dataService.getNestedData(id).subscribe((response) => {
        this.nestedData = response;
        this.nestedItems = this.nestedData.response.requestItems[0];
        // this.dataNestedSource = new MatTableDataSource(this.nestedItems);
        console.log('nested data', this.nestedItems);
        this.#cdr.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
