// Database Setup Script
// Run this with: node setup-db.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vbptvktbnwsxkljmcvzj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZicHR2a3RibndzeGtsam1jdnpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzcwODc5MywiZXhwIjoyMDY5Mjg0NzkzfQ.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8'; // You'll need to get the service role key

const supabase = createClient(supabaseUrl, supabaseKey);

const setupDatabase = async () => {
  try {
    console.log('Setting up database schema...');
    
    // Create profiles table
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          avatar TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (profilesError) {
      console.error('Error creating profiles table:', profilesError);
    } else {
      console.log('✅ Profiles table created');
    }
    
    // Create sessions table
    const { error: sessionsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS sessions (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
          session_name TEXT NOT NULL,
          last_modified TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          chat_history JSONB DEFAULT '[]',
          generated_code JSONB DEFAULT '{"jsx": "", "css": ""}',
          component_properties JSONB DEFAULT '[]',
          tags TEXT[],
          is_starred BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (sessionsError) {
      console.error('Error creating sessions table:', sessionsError);
    } else {
      console.log('✅ Sessions table created');
    }
    
    console.log('Database setup completed!');
    
  } catch (error) {
    console.error('Database setup failed:', error);
  }
};

setupDatabase(); 