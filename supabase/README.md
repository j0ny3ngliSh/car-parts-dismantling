# Supabase Setup Guide

## Quick Start

### 1. Run the Migration SQL

Go to your Supabase project dashboard:
- Navigate to **SQL Editor**
- Click **New Query**
- Copy and paste the contents of `migrations/001_create_piese_table.sql`
- Click **Run**

This will:
- Create the `parts` table with proper schema
- Set up Row Level Security (RLS) policies
- Insert 5 sample parts from the catalog

### 2. Verify Data

After running the migration, check that data was inserted:
```sql
SELECT id, name, bmw_model, price FROM parts;
```

### 3. Test the API

The site will now:
- Fetch parts from Supabase via `/api/parts`
- Display them in the catalog at `/`
- Show detail pages at `/piesa/[id]`
- Allow admin CRUD operations at `/admin`

### Environment Variables

Ensure these are set in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Schema Overview

| Column | Type | Notes |
|--------|------|-------|
| id | TEXT (Primary Key) | Unique identifier |
| name | TEXT | Part name |
| bmw_model | TEXT | BMW model |
| price | INTEGER | Price in lei |
| description | TEXT | Description |
| image_placeholder | TEXT | Image URL |
| condition | TEXT | Condition (Excelentă, Foarte bună, Bună) |
| km | INTEGER | Kilometers |
| details | JSONB | Technical details, category, compatibility |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Update timestamp |

## RLS Policies

- **Public Read**: Anyone can view all parts
- **Authenticated Create/Update/Delete**: Only logged-in users can modify parts

This ensures the admin panel can manage parts while keeping the public catalog accessible.
