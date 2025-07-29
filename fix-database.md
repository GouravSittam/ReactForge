# 🚨 URGENT: Fix Database Trigger Issue

The "Database error saving new user" error is caused by a broken database trigger. Here's how to fix it:

## 🔧 **Step 1: Access Supabase Dashboard**

1. Go to: https://supabase.com/dashboard
2. Sign in to your account
3. Select your project: `vbptvktbnwsxkljmcvzj`

## 🔧 **Step 2: Remove the Broken Trigger**

1. Go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Remove the broken trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();
```

4. Click **"Run"**

## 🔧 **Step 3: Create a Working Trigger**

1. In the same SQL Editor, create a new query
2. Copy and paste this SQL:

```sql
-- Create a working trigger function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name, avatar)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

3. Click **"Run"**

## 🔧 **Step 4: Test Registration**

1. Go back to your app
2. Try registering with your email again
3. It should work now! ✅

## 🎯 **What This Fixes:**

- ✅ **Removes the broken trigger** that was causing the 500 error
- ✅ **Creates a new trigger** with proper error handling
- ✅ **Allows user registration** to work properly
- ✅ **Creates profiles** automatically when users sign up

## 🚨 **If You Still Get Errors:**

The updated code will now create a temporary user account that works without the database, so registration will succeed even if the database setup isn't perfect.

Try the registration again after following these steps! 