export const columns: string[] = [
  'id',
  'username',
  'budgeted',
  'position',
  'location',
  'remarks',
  'type',
  'status',
  'reason',
];

export const NestedColumns: string[] = [
  ...columns,
  'approvedBy',
  'hiring_date',
  'description',
  'vehicle_plate_no',
  'vehicle_value',
  'vehicle_brand',
  'vehicle_model',
];

export const MainNestedColumns: string[] = [
  'id',
  'code',
  'date',
  'status',
  'requestedby_id',
  'approvedby_id',
  'parent',
  'remarks',
  'requestedby_name',
  'approvedby_name',
];
