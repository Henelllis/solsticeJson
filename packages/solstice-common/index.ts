export interface JsonFile {
  customers: Customer[];
  accounts: Account[];
}

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;
  account_manager_id: number;
  reason_for_joining: string;
  created_date: string;
}

export interface Account {
  id: number;
  customer_id: number;
  address: string;
  city: string;
  zip_code: string;
  solar_farm_id: null | number;
  reason_for_joining: null | number;
  created_date: string;
}
