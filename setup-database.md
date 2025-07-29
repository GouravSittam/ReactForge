# Database Setup Guide

To fix the "Database error saving new user" issue, you need to set up your Supabase database properly.

## Step 1: Access Your Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Sign in to your account
3. Select your project: `vbptvktbnwsxkljmcvzj`

## Step 2: Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire content from `supabase-schema.sql`
4. Click **Run** to execute the schema

## Step 3: Verify the Tables Were Created

1. Go to **Table Editor** in your Supabase dashboard
2. You should see two tables:
   - `profiles`
   - `sessions`

## Step 4: Check Authentication Settings

1. Go to **Authentication** → **Settings**
2. Make sure **Enable signups** is turned ON
3. For testing, you can disable **Email confirmations** to allow immediate login

## Step 5: Test the Registration

1. Restart your development server: `bun run dev`
2. Try registering a new user
3. The registration should now work without the database error

## Troubleshooting

### If you still get database errors:

1. **Check RLS Policies**: Make sure Row Level Security is properly configured
2. **Verify Trigger Function**: The `handle_new_user()` function should be created
3. **Check Permissions**: Ensure the anon key has proper permissions

### Manual Profile Creation

If the trigger still doesn't work, the updated code will manually create profiles, so registration should work regardless.

## Database Schema Overview

The schema creates:

- **profiles table**: Stores user profile information
- **sessions table**: Stores user sessions and generated components
- **RLS policies**: Ensures users can only access their own data
- **Triggers**: Automatically creates profiles when users sign up
- **Indexes**: Improves query performance

## Environment Variables

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=https://vbptvktbnwsxkljmcvzj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZicHR2a3RibndzeGtsam1jdnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MDg3OTMsImV4cCI6MjA2OTI4NDc5M30.HWDrQ9Ac8bXePMGX2-MOmSS1UJBzLTMS3smaxsVg140
```

After following these steps, user registration should work properly! 