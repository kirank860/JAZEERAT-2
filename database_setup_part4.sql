-- ===============================================================================
-- JAZEERAT AL HADEED - DATABASE SETUP SCRIPT (PART 4)
-- ===============================================================================
-- This script creates the `hero_assets` table to dynamically manage
-- images and videos for the Home slider and subpage heroes.

-- 1. Create the `hero_assets` table
CREATE TABLE IF NOT EXISTS public.hero_assets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  page_key text NOT NULL, -- e.g., 'home', 'about', 'services', 'projects', 'facilities', 'contact'
  asset_type text NOT NULL CHECK (asset_type IN ('image', 'video')),
  asset_url text NOT NULL,
  title text,
  subtitle text,
  tag text,
  sort_order integer DEFAULT 0 -- Used for ordering home page slides
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.hero_assets ENABLE ROW LEVEL SECURITY;

-- 3. Create a public read policy
CREATE POLICY "Enable read access for all users" ON public.hero_assets
  FOR SELECT USING (true);

-- 4. Insert default data for the Home page slider (3 slides)
INSERT INTO public.hero_assets (page_key, asset_type, asset_url, title, subtitle, tag, sort_order)
VALUES 
  (
    'home', 
    'image', 
    '/assets/slides/slide-3.webp', 
    'Leading Manufacturers of Versatile Steel Products', 
    'Structural steel, CNC fabrication and precision machining for the MENA region.', 
    'GCC Fabrication', 
    1
  ),
  (
    'home', 
    'image', 
    '/assets/slides/slide-2.webp', 
    'Precision Fabrication. Reliable Delivery.', 
    'Every weld certified, every deadline met — from first drawing to final installation.', 
    'Machine Workshop', 
    2
  ),
  (
    'home', 
    'image', 
    '/assets/slides/slide-1.webp', 
    'Engineering Steel Solutions Across The Region', 
    'One integrated workshop. Full capability. On-time delivery to any GCC site.', 
    'Structural Steel', 
    3
  );

-- 5. Insert default data for the subpage heroes
INSERT INTO public.hero_assets (page_key, asset_type, asset_url, title, subtitle)
VALUES 
  ('about', 'video', '/assets/about-hero.mp4', 'About Jazeerat Al Hadeed', 'Built on the shop floor.'),
  ('services', 'video', '/assets/about-hero.mp4', 'Our Services', 'Comprehensive steel fabrication solutions.'),
  ('facilities', 'video', '/assets/about-hero.mp4', 'Our Facilities', 'State-of-the-art machinery and workspace.'),
  ('projects', 'video', '/assets/about-hero.mp4', 'Project Gallery', 'Precision delivered across the region.'),
  ('contact', 'video', '/assets/about-hero.mp4', 'Request a Quote', 'Let''s start your next project.');

-- End of Part 4
