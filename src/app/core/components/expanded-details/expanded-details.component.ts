import {
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
  @Input() id: number = 22455;
  @ViewChildren('innerTable') innerTable!: QueryList<MatTable<any>>;

  readonly #dataService = inject(DataService);
  readonly #cdr = inject(ChangeDetectorRef);

  nestedItems: any = [];
  subscription = new Subscription();
  dataNestedSource!: MatTableDataSource<any>;

  ngOnChanges(): void {
    if (this.id !== undefined) {
      this.loadNestedData(this.id);
    }
  }
  private loadNestedData(id: number): void {
    this.subscription.add(
      this.#dataService.getNestedData(id).subscribe((response) => {
        let nestedData = response;
        if (Array.isArray(nestedData.response.requestItems)) {
          this.nestedItems = nestedData.response.requestItems[0];
        } else {
          this.nestedItems = Object.entries(
            nestedData.response.requestItems[0]
          ).map(([key, value]) => ({ key, value }));
        }
        this.dataNestedSource = new MatTableDataSource(this.nestedItems);
        console.log('test', this.nestedItems);
        this.#cdr.detectChanges();
      })
    );
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
