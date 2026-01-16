/*
  # Create Waitlist Table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key) - Unique identifier for each signup
      - `email` (text, unique, not null) - User's email address
      - `name` (text) - Optional user name
      - `created_at` (timestamptz) - Timestamp of signup
      - `referral_source` (text) - Optional tracking of how they found us
      - `interests` (text[]) - Optional array of interests/features they're excited about

  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for anonymous users to insert their own signup
    - Add policy for authenticated admin users to view all signups

  3. Indexes
    - Index on email for quick lookups
    - Index on created_at for sorting by signup date
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  created_at timestamptz DEFAULT now(),
  referral_source text,
  interests text[]
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up for waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all waitlist signups"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);