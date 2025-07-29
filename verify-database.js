// Database Verification Script
// Run this to check if your database is properly set up

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vbptvktbnwsxkljmcvzj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZicHR2a3RibndzeGtsam1jdnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MDg3OTMsImV4cCI6MjA2OTI4NDc5M30.HWDrQ9Ac8bXePMGX2-MOmSS1UJBzLTMS3smaxsVg140';

const supabase = createClient(supabaseUrl, supabaseKey);

const verifyDatabase = async () => {
  console.log('🔍 Verifying database setup...\n');
  
  try {
    // Check if profiles table exists
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (profilesError) {
      console.log('❌ Profiles table error:', profilesError.message);
    } else {
      console.log('✅ Profiles table exists and is accessible');
    }
    
    // Check if sessions table exists
    const { data: sessions, error: sessionsError } = await supabase
      .from('sessions')
      .select('*')
      .limit(1);
    
    if (sessionsError) {
      console.log('❌ Sessions table error:', sessionsError.message);
    } else {
      console.log('✅ Sessions table exists and is accessible');
    }
    
    // Check RLS policies
    console.log('\n🔒 Checking Row Level Security...');
    
    // Try to insert a test profile (should fail due to RLS)
    const { error: insertError } = await supabase
      .from('profiles')
      .insert([{
        id: '00000000-0000-0000-0000-000000000000',
        email: 'test@example.com',
        name: 'Test User'
      }]);
    
    if (insertError && insertError.message.includes('new row violates row-level security policy')) {
      console.log('✅ RLS policies are working correctly');
    } else {
      console.log('⚠️  RLS policies may not be set up correctly');
    }
    
    console.log('\n🎯 Database verification completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Make sure you\'ve run the safe-database-setup.sql script');
    console.log('2. Enable signups in Supabase Authentication settings');
    console.log('3. Try registering a new user');
    
  } catch (error) {
    console.error('❌ Database verification failed:', error);
  }
};

verifyDatabase(); 