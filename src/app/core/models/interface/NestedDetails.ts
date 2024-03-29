export interface NestedDetails {
  id?: number;
  status?: string;
  remarks: string;
  approvedBy?: string;
  approvedDate?: Date;
  budget_amount?: number;
  budgeted: number;
  position: string;
  location: string;
  hiring_date: Date;
  username: string;
  date_of_last_repair: Date;
  description: string;
  reason: number;
  requestId?: number;
  type: string;
  vehicle_brand?: string;
  vehicle_plate_no?: string;
  vehicle_model?: string;
  vehicle_id?: number;
  vehicle_value?: string;
  vehicle_type?: string;
  quotations?: any[];
}
