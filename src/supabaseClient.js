import { createClient } from "@supabase/supabase-js";
const supabaseUrl = 'https://kilxtvrzyuznowxjjkoq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpbHh0dnJ6eXV6bm93eGpqa29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNzk3NzEsImV4cCI6MjA5MDk1NTc3MX0.f2ah92xihKv_FizCBjTts60N9xw20BkYBHv9UE96ToI'

export const supabase = createClient(supabaseUrl, supabaseKey)