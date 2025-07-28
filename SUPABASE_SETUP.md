# Supabase Setup Guide

This guide will help you set up Supabase authentication for your ComponentGen Pro application.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `componentgen-pro` (or your preferred name)
   - Database Password: Choose a strong password
   - Region: Select the region closest to your users
5. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## 3. Update Environment Variables

Update your `.env.local` file with your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql`
3. Paste it into the SQL editor and click "Run"

This will create:
- `profiles` table for user profiles
- `sessions` table for component sessions
- Row Level Security (RLS) policies
- Triggers for automatic profile creation
- Indexes for better performance

## 5. Configure Authentication

### Email Authentication
1. Go to **Authentication** → **Settings**
2. Enable "Enable email confirmations" if you want email verification
3. Configure email templates as needed

### Social Authentication (Optional)

#### Google OAuth
1. Go to **Authentication** → **Providers**
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Add authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (for development)

#### GitHub OAuth
1. Go to **Authentication** → **Providers**
2. Enable GitHub provider
3. Add your GitHub OAuth credentials:
   - Client ID
   - Client Secret
4. Add authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (for development)

## 6. Configure OAuth Apps

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Configure authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback`

### GitHub OAuth Setup
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Configure the app:
   - Application name: `ComponentGen Pro`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `https://your-project-id.supabase.co/auth/v1/callback`

## 7. Test the Setup

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/register`
3. Try creating an account with email/password
4. Test social login buttons (if configured)

## 8. Production Deployment

When deploying to production:

1. Update your Supabase project settings:
   - Add your production domain to authorized redirect URIs
   - Configure production OAuth apps with production URLs

2. Update environment variables in your hosting platform:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**
   - Make sure your redirect URIs are correctly configured in both Supabase and OAuth providers
   - Include both development and production URLs

2. **"Missing Supabase environment variables" error**
   - Check that your `.env.local` file has the correct Supabase URL and anon key
   - Restart your development server after updating environment variables

3. **Database connection errors**
   - Verify that the SQL schema has been applied correctly
   - Check that RLS policies are enabled

4. **Social login not working**
   - Verify OAuth credentials are correct
   - Check that redirect URIs match exactly
   - Ensure the OAuth provider is enabled in Supabase

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues) 