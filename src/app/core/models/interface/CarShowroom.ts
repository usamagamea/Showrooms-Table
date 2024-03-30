import { MatTableDataSource } from '@angular/material/table';

export interface CarShowroom {
  response: Data[];
  status: Status[];
  totalCount?: number;
}

export interface CarRequest {
  approvedBy: string;
  approvedDate: string;
  location: string;
  remarks: string;
  vehicle_brand: string;
  type: string;
  vehicle_value: number;
}

export interface Status {
  code: number;
  message: string;
}

export interface DataTable {
  id: number;
  date: Date;
  status: number;
  requestedby_name: string;
  vehicleNumber: string;
  code: string;
  requestItems: MatTableDataSource<any>;
}

interface Data {
  data: DataTable[];
}
