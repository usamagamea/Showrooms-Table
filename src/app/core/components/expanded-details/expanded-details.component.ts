import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  inject,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import {
  NestedDetails,
  ResponseDto,
} from '../../models/interface/NestedDetails';
import { MainNestedColumns } from '../../models/constants/columns';

@Component({
  selector: 'expanded-details',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './expanded-details.component.html',
})
export class ExpandedDetailsComponent implements OnChanges, OnDestroy {
  @Input() id!: number;

  readonly #dataService = inject(DataService);
  readonly #cdr = inject(ChangeDetectorRef);

  nestedItems: ResponseDto[] = [];
  displayedColumns = MainNestedColumns;
  subscription = new Subscription();
  nestedItemsArray: any[] = [];
  dataNestedSource: MatTableDataSource<NestedDetails> =
    new MatTableDataSource();

  ngOnChanges(): void {
    if (this.id !== undefined) {
      this.loadNestedData(this.id);
    }
  }

  private loadNestedData(id: number): void {
    this.subscription.add(
      this.#dataService.getNestedData(id).subscribe((response) => {
        let nestedData: any = response;

        let nestedItems = nestedData.response?.requestItems[0];
        this.nestedItemsArray = Object.entries(nestedItems);
        this.dataNestedSource = new MatTableDataSource(
          this.nestedItemsArray as NestedDetails[]
        );

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
