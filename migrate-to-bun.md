# Migration to Bun

This project has been successfully converted to use Bun as the package manager. Here's what changed and how to migrate:

## What Changed

1. **Lock Files**: 
   - Removed: `package-lock.json` (npm), `pnpm-lock.yaml` (pnpm)
   - Added: `bun.lock` (bun)

2. **Package.json**: Added bun-specific scripts for better performance

3. **Gitignore**: Updated to include bun-specific entries

## Migration Steps

### 1. Install Bun (if not already installed)

```bash
# On macOS or Linux
curl -fsSL https://bun.sh/install | bash

# On Windows (using PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# Or using npm
npm install -g bun
```

### 2. Clean up existing files

```bash
# Remove existing lock files and node_modules
rm -rf node_modules package-lock.json pnpm-lock.yaml yarn.lock
```

### 3. Install dependencies with Bun

```bash
bun install
```

### 4. Run the development server

```bash
bun run dev
```

## Benefits of Using Bun

- **Faster installation**: Bun installs dependencies significantly faster than npm
- **Better performance**: Bun's JavaScript runtime is faster than Node.js
- **Built-in bundler**: Bun includes a fast bundler for production builds
- **TypeScript support**: Native TypeScript support without additional configuration
- **Compatibility**: Works with most npm packages

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

## Troubleshooting

If you encounter any issues:

1. **Clear cache**: `bun pm cache rm`
2. **Reinstall**: `rm -rf node_modules bun.lock && bun install`
3. **Check Bun version**: `bun --version`

## Fallback to npm

If you prefer to continue using npm, you can still do so:

```bash
npm install
npm run dev
```

The project is compatible with both Bun and npm. 