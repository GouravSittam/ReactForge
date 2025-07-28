# 🚀 Supabase Database Setup Guide

Your ReactForge application is now fully integrated with Supabase! All your data will be automatically saved to the cloud database.

## 📋 Prerequisites

1. **Supabase Project**: You already have one at `https://vbptvktbnwsxkljmcvzj.supabase.co`
2. **Service Role Key**: You need to add this to your environment variables

## 🔧 Setup Steps

### Step 1: Get Your Service Role Key

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `vbptvktbnwsxkljmcvzj`
3. Go to **Settings** → **API**
4. Copy the **Service Role Key** (not the anon key)

### Step 2: Add Service Role Key to Environment

Add this line to your `.env.local` file:

```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Step 3: Run the Database Schema

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire content of `supabase-schema.sql`
4. Click **Run** to execute the schema

### Step 4: Enable Signups (if not already enabled)

1. Go to **Authentication** → **Settings**
2. Make sure **Enable signups** is turned ON
3. Optionally disable **Email confirmations** for easier testing

## 🎯 What's Now Working

### ✅ Automatic Data Persistence
- **Sessions**: All your sessions are saved to Supabase
- **Chat History**: Every conversation is stored in the database
- **Generated Code**: Your components are saved automatically
- **User Data**: Each user has their own isolated data

### ✅ Real-time Features
- **Cross-device Sync**: Access your data from any device
- **Data Backup**: Your data is safely stored in the cloud
- **User Isolation**: Each user only sees their own data

### ✅ API Integration
- **Session Management**: Create, read, update sessions via API
- **Component Generation**: AI-generated components are saved
- **Authentication**: Secure user authentication with Supabase

## 🔍 Database Schema

Your Supabase database now has these tables:

### `profiles` Table
- User profile information
- Automatically created when users sign up

### `sessions` Table
- All your component generation sessions
- Includes chat history, generated code, and properties
- User-specific with Row Level Security (RLS)

## 🛡️ Security Features

- **Row Level Security (RLS)**: Users can only access their own data
- **JWT Authentication**: Secure token-based authentication
- **Automatic User Creation**: Profiles created automatically on signup

## 🚀 How to Use

1. **Sign up/Login**: Use your existing Supabase authentication
2. **Create Sessions**: All sessions are automatically saved to the database
3. **Generate Components**: AI responses are saved with your session
4. **Access Anywhere**: Your data is available from any device

## 🔧 Troubleshooting

### If you see "supabaseKey is required" errors:
1. Make sure `SUPABASE_SERVICE_ROLE_KEY` is in your `.env.local`
2. Restart your development server: `npm run dev`

### If sessions aren't loading:
1. Check that the database schema was run successfully
2. Verify your Supabase project URL and keys are correct

### If authentication isn't working:
1. Make sure signups are enabled in Supabase
2. Check that email confirmations are configured as desired

## 📊 Data Structure

Your sessions are stored with this structure:
```json
{
  "id": "uuid",
  "user_id": "user-uuid",
  "session_name": "My Component",
  "chat_history": [...],
  "generated_code": {
    "jsx": "...",
    "css": "..."
  },
  "component_properties": [...],
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

## 🎉 You're All Set!

Your ReactForge application now has:
- ✅ Cloud database storage
- ✅ Automatic data persistence
- ✅ User data isolation
- ✅ Cross-device synchronization
- ✅ Secure authentication
- ✅ Real-time updates

Everything you save will now be automatically stored in your Supabase database! 🚀 