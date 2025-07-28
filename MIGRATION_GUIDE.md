# Migration Guide: From Custom Auth to Supabase

This guide helps you migrate from the existing custom authentication system to Supabase authentication.

## What's Changed

### New Features
- ✅ Supabase authentication with email/password
- ✅ Social login (Google, GitHub)
- ✅ Automatic user profile creation
- ✅ Row Level Security (RLS) for data protection
- ✅ Real-time authentication state management
- ✅ Built-in session management

### Removed Features
- ❌ Custom JWT token management
- ❌ Manual API route handling for auth
- ❌ Custom user profile management

## Migration Steps

### 1. Backup Your Data

Before migrating, backup your existing data:

```bash
# Export your current database
# (This depends on your current database setup)
```

### 2. Set Up Supabase

Follow the [Supabase Setup Guide](./SUPABASE_SETUP.md) to:
- Create a Supabase project
- Set up the database schema
- Configure authentication providers

### 3. Update Environment Variables

Replace your old auth environment variables with Supabase ones:

**Old (.env.local):**
```env
MONGODB_URI=mongodb://localhost:27017/component-generator
JWT_SECRET=your-jwt-secret
```

**New (.env.local):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Update Your Code

The authentication provider has been updated. Your existing components should work with minimal changes:

**Old:**
```tsx
import { useAuth } from "@/components/auth-provider"
```

**New:**
```tsx
import { useSupabaseAuth } from "@/components/supabase-auth-provider"
```

### 5. Data Migration (Optional)

If you have existing user data, you can migrate it to Supabase:

```sql
-- Example migration script (adjust based on your current schema)
INSERT INTO profiles (id, email, name, created_at)
SELECT 
  gen_random_uuid(),
  email,
  name,
  created_at
FROM your_old_users_table;
```

### 6. Test the Migration

1. Start your development server: `npm run dev`
2. Test user registration and login
3. Verify that existing functionality still works
4. Test social login (if configured)

## Breaking Changes

### API Routes
The following API routes are no longer needed:
- `/api/auth/login`
- `/api/auth/register`
- `/api/auth/verify`

These are now handled by Supabase directly.

### Session Management
- Sessions are now managed by Supabase
- No need to manually handle JWT tokens
- Automatic session refresh

### User Data
- User profiles are automatically created in Supabase
- Profile data is stored in the `profiles` table
- Session data is stored in the `sessions` table

## Rollback Plan

If you need to rollback:

1. Revert the environment variables
2. Switch back to the old auth provider in `app/layout.tsx`
3. Restore your old API routes
4. Update component imports back to the old auth provider

## Support

If you encounter issues during migration:

1. Check the [Supabase Setup Guide](./SUPABASE_SETUP.md)
2. Review the [Supabase Documentation](https://supabase.com/docs)
3. Check the browser console for error messages
4. Verify your environment variables are correct

## Benefits of Migration

- **Security**: Built-in security features with RLS
- **Scalability**: Supabase handles authentication scaling
- **Features**: Social login, email verification, password reset
- **Maintenance**: Less custom code to maintain
- **Real-time**: Built-in real-time capabilities
- **Analytics**: Built-in user analytics and insights 