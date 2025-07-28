import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables')
}

export const supabase = createClient(
  supabaseUrl || 'https://vbptvktbnwsxkljmcvzj.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZicHR2a3RibndzeGtsam1jdnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MDg3OTMsImV4cCI6MjA2OTI4NDc5M30.HWDrQ9Ac8bXePMGX2-MOmSS1UJBzLTMS3smaxsVg140'
) 