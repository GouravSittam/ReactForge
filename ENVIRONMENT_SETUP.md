# 🔧 Environment Variables Setup

Your application is now working with fallback responses, but to get full Supabase database functionality, you need to add the missing environment variables.

## 📁 Create .env.local File

Create a file called `.env.local` in your project root with the following content:

```env
MONGODB_URI=mongodb://localhost:27017/component-generator
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
GOOGLE_API_KEY=your-google-ai-api-key-here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://vbptvktbnwsxkljmcvzj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZicHR2a3RibndzeGtsam1jdnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MDg3OTMsImV4cCI6MjA2OTI4NDc5M30.HWDrQ9Ac8bXePMGX2-MOmSS1UJBzLTMS3smaxsVg140

# You need to add your Supabase Service Role Key here
# Get it from: https://supabase.com/dashboard/project/vbptvktbnwsxkljmcvzj/settings/api
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## 🔑 How to Get Your Service Role Key

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `vbptvktbnwsxkljmcvzj`
3. Go to **Settings** → **API**
4. Copy the **Service Role Key** (not the anon key)
5. Replace `your-service-role-key-here` with your actual service role key

## 🚀 What Happens After Setup

Once you add the service role key:

- ✅ **Full Database Integration**: All sessions will be saved to Supabase
- ✅ **Real AI Generation**: Google AI will generate actual components
- ✅ **Cross-Device Sync**: Your data will be available everywhere
- ✅ **Automatic Backups**: Your data is safely stored in the cloud

## 🔧 Current Status

Right now your application is working with:
- ✅ **Fallback Responses**: Mock data when Supabase is not configured
- ✅ **Local Storage**: Sessions are saved locally
- ✅ **Basic Functionality**: You can create and manage sessions
- ⚠️ **Limited AI**: Mock component generation
- ⚠️ **No Cloud Sync**: Data stays on your device

## 🎯 Next Steps

1. **Add Service Role Key**: Follow the steps above
2. **Run Database Schema**: Use the `supabase-schema.sql` file
3. **Restart Server**: Run `npm run dev` again
4. **Test Full Features**: Create sessions and generate components

## 🆘 If You Need Help

- **Service Role Key**: Look for "service_role" key in Supabase dashboard
- **Database Schema**: Copy the content of `supabase-schema.sql` and run it in Supabase SQL Editor
- **Environment Variables**: Make sure `.env.local` is in your project root

Your application is fully functional now, but adding the service role key will unlock the full cloud database features! 🚀 