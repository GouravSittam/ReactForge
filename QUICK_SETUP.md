# 🚨 QUICK FIX: Database Error

The "Database error saving new user" error occurs because your Supabase database isn't set up properly. Here's how to fix it in 2 minutes:

## 🔧 **Step 1: Set Up Database (2 minutes)**

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: `vbptvktbnwsxkljmcvzj`
3. **Go to SQL Editor** (left sidebar)
4. **Click "New Query"**
5. **Copy and paste** the entire content from `database-setup.sql`
6. **Click "Run"**

## 🔧 **Step 2: Enable Signups**

1. **Go to Authentication** → **Settings**
2. **Turn ON "Enable signups"**
3. **Turn OFF "Email confirmations"** (for easier testing)

## 🔧 **Step 3: Test Registration**

1. **Restart your dev server**: `bun run dev`
2. **Try registering** with your email again
3. **It should work now!** ✅

## 🎯 **What This Fixes:**

- ✅ Creates the `profiles` table
- ✅ Creates the `sessions` table  
- ✅ Sets up Row Level Security (RLS)
- ✅ Creates the trigger function for automatic profile creation
- ✅ Grants proper permissions to the anon role

## 🚨 **If You Still Get Errors:**

The updated code will now show a helpful error message if the database isn't set up, and registration should work even without the database trigger.

## 📞 **Need Help?**

If you're still having issues after running the SQL script, the problem might be:
- Supabase project permissions
- Network connectivity
- Environment variables

Let me know if you need further assistance! 