import { MatTableDataSource } from '@angular/material/table';
import { Status } from './CarShowroom';

export interface NestedDetails {
  status?: Status[];
  response?: ResponseDto[];
}

export interface ResponseDto {
  id?: number;
  code?: string;
  date?: Date;
  status?: number;
  requestedby_id?: number;
  approvedby_id?: number;
  requestItems?: RequestItems[] | MatTableDataSource<RequestItems>;
  attachments?: unknown;
  parent?: number;
  remarks?: string;
  requestedby_name?: string;
  approvedby_name?: string;
}
export interface ResponseDataSource {
  id?: number;
  code?: string;
  date?: Date;
  status?: number;
  requestedby_id?: number;
  approvedby_id?: number;
  requestItems?: MatTableDataSource<RequestItems>;
  attachments?: unknown;
  parent?: number;
  remarks?: string;
  requestedby_name?: string;
  approvedby_name?: string;
}
export interface RequestItems {
  id?: number;
  status?: string;
  remarks?: string;
  approvedBy?: string;
  approvedDate?: Date;
  budget_amount?: number;
  budgeted?: number;
  position?: string;
  location?: string;
  hiring_date?: Date;
  username?: string;
  date_of_last_repair?: Date;
  description?: string;
  reason?: number;
  requestId?: number;
  type?: string;
  vehicle_brand?: string;
  vehicle_plate_no?: string;
  vehicle_model?: string;
  vehicle_id?: number;
  vehicle_value?: string;
  vehicle_type?: string;
  quotations?: Quotations[];
}

export interface Quotations {
  id?: number;
  requestId?: number;
  showroomId?: number;
  showroom?: string;
  requestItemId?: number;
  code?: string;
  vehicleType?: string;
  brand?: string;
  model?: string;
  year?: string;
  color?: string;
  price?: string;
  remarks?: string;
  date?: Date;
  user?: string;
  status?: string;
  actionBy?: string;
  actionDate?: Date;
  showroomName?: string;
  attachments?: [];
}
