export interface Customer {
  id: number;
  company_name: string;
  registration_num: string; // unique
  sector?: string | null;
  email: string; // unique
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  contact_person?: string | null;
  is_active: boolean;
  created_at: string; // ou Date si tu castes après
  updated_at: string; // idem
}
