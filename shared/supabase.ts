import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface Ticket {
  id: string;
  ticket_number: string;
  customer_id: string;
  device: string;
  model: string;
  problem: string;
  status: "neu" | "in_reparatur" | "warten_teile" | "fertig" | "abgeholt";
  price: number | null;
  created_at: string;
  updated_at: string;
  booking_date: string;
}

export interface Invoice {
  id: string;
  ticket_id: string;
  total: number;
  pdf_url: string | null;
  created_at: string;
  paid: boolean;
}
