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
        let nestedData: NestedDetails = response;

        this.dataNestedSource = new MatTableDataSource<NestedDetails>(
          nestedData.response as NestedDetails[]
        );
        this.nestedItems = nestedData.response as ResponseDto[];
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
