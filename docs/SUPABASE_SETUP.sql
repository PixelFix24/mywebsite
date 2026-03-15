-- ============================================
-- PixelFix24 Repair Management System
-- Database Schema Setup
-- ============================================

-- 1. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. TICKETS TABLE
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number VARCHAR(20) UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  device VARCHAR(255) NOT NULL,
  model VARCHAR(255),
  problem TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'neu',
  price DECIMAL(10, 2),
  booking_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT status_check CHECK (status IN ('neu', 'in_reparatur', 'warten_teile', 'fertig', 'abgeholt'))
);

-- 3. INVOICES TABLE
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  total DECIMAL(10, 2) NOT NULL,
  pdf_url TEXT,
  paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Create sequence for ticket numbers
CREATE SEQUENCE IF NOT EXISTS ticket_number_seq START WITH 1;

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you can make these more restrictive later)
CREATE POLICY "Enable insert for authenticated users only" ON customers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all" ON customers
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON tickets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all" ON tickets
  FOR SELECT USING (true);

CREATE POLICY "Enable update for authenticated users only" ON tickets
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for authenticated users only" ON tickets
  FOR DELETE USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON invoices
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all" ON invoices
  FOR SELECT USING (true);

-- ============================================
-- Create INDEXES for better performance
-- ============================================

CREATE INDEX idx_tickets_customer ON tickets(customer_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_ticket_number ON tickets(ticket_number);
CREATE INDEX idx_invoices_ticket ON invoices(ticket_id);
