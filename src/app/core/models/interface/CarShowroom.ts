export interface CarShowroom {
  response: Data[];
  status: Status[];
  totalCount?: number;
}

 interface Status {
  code: number;
  message: string;
}

export interface DataTable {
  id: number;
  name: string;
  email: string;
  phone1: string;
  address: string;
  code: string;
}

interface Data {
  data: DataTable[];
}

