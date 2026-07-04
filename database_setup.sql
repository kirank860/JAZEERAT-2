-- 1. Create the projects table
CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  location text NOT NULL,
  scope text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  image_url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Insert the existing projects data
INSERT INTO public.projects (title, location, scope, description, icon, image_url) VALUES
('Industrial Fabrication', 'UAE', 'Portal frames, columns and steel decks', 'A massive 40,000 sqm industrial fabrication facility requiring over 2,500 tons of structural steel. Delivered exactly on schedule with zero lost-time incidents. Included full portal frames, mezzanine decks, and heavy gantry crane runway beams.', 'Factory', '/assets/slides/slide-1.webp'),
('Oil & Gas Structure', 'Oman', 'Pipe racks, access platforms and bracing systems', 'Precision fabrication for a mid-stream processing plant. Required stringent NDT testing and specialized offshore-grade protective coatings. We delivered modular pipe racks and access platforms built to handle extreme operating environments.', 'Home', '/assets/slides/slide-2.webp'),
('Logistics Hub', 'Qatar', 'Warehouse steelwork and loading canopies', 'A regional distribution center featuring wide-span steel trusses and extensive cantilevered loading canopies. Engineered for fast on-site bolted assembly, significantly reducing the main contractor''s erection timeline.', 'Truck', '/assets/slides/slide-3.webp'),
('Compliance Works', 'Saudi Arabia', 'Inspection-ready welded assemblies and stair packs', 'High-compliance welded assemblies subjected to 100% ultrasonic testing. Included complex industrial stair towers and safety handrail packs designed for immediate drop-in installation at a sensitive petrochemical facility.', 'ShieldCheck', '/assets/project-4.jpg'),
('Architectural Steel', 'Bahrain', 'Custom balustrades, facades and structural trusses', 'A striking commercial high-rise where the structural steel is also the architectural finish. Featured intricate exposed trusses and custom-fabricated balustrades, all requiring AESS (Architecturally Exposed Structural Steel) finishing standards.', 'Layers', '/assets/project-5.jpg'),
('Heavy Erection', 'Kuwait', 'Pre-assembled modules and site erection support', 'Delivery and erection of pre-assembled heavy equipment modules weighing up to 60 tons each. Required complex lifting plans, tandem crane coordination, and precision alignment at height.', 'Truck', '/assets/project-6.jpg');

-- 3. Create the team table
CREATE TABLE public.team (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  image_url text NOT NULL,
  quote text NOT NULL,
  years text NOT NULL,
  location text NOT NULL,
  bio text NOT NULL,
  skills jsonb NOT NULL,
  email text NOT NULL,
  rotate numeric NOT NULL,
  offset_x numeric NOT NULL,
  offset_y numeric NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Insert the existing team data
INSERT INTO public.team (name, role, image_url, quote, years, location, bio, skills, email, rotate, offset_x, offset_y) VALUES
('Ahmed Al Mansoori', 'Founder & Managing Director', '/assets/team-ahmed.jpg', 'Steel doesn''t lie. Neither do we.', '5+ yrs', 'Dubai, UAE', 'Ahmed founded Jazeerat Al Hadeed in 2019 with a single fabrication bay and a vision to set a new standard for structural steel in the MENA region. Under his leadership the company grew rapidly and expanded operations across the region.', '["Strategic Leadership", "Client Relations", "Business Development", "UAE Construction Law"]', 'ahmed@jazeerat.ae', -3, -60, 20),
('Khalid Ibrahim', 'Head of Fabrication', '/assets/team-khalid.jpg', 'If the drawing says ±1 mm, we hit ±0.5.', '14 yrs', 'Sharjah, UAE', 'With over two decades on the shop floor, Khalid oversees the entire fabrication lifecycle. He spearheaded our transition to automated CNC plasma cutting, increasing workshop throughput by 40%.', '["CNC Programming", "Quality Assurance", "Welding Inspection (CSWIP)", "Production Scaling"]', 'khalid@jazeerat.ae', 2, 80, -10),
('Sarah Al Qasimi', 'Chief Structural Engineer', '/assets/team-sarah.jpg', 'Engineering is making the impossible, buildable.', '9 yrs', 'Dubai, UAE', 'Sarah leads a team of 15 structural engineers and detailers. She holds a Masters in Structural Engineering and is renowned for optimizing heavy steel connections to reduce site erection time.', '["Tekla Structures", "STAAD.Pro", "Connection Design", "Value Engineering"]', 'sarah@jazeerat.ae', -1.5, -40, 15),
('Tariq Hassan', 'Operations Manager', '/assets/team-tariq.jpg', 'Logistics is just as critical as the weld itself.', '11 yrs', 'Abu Dhabi, UAE', 'Tariq orchestrates the complex logistics of moving oversized steel components across international borders. His precise scheduling ensures site teams never wait for material.', '["Fleet Management", "Cross-border Logistics", "Site Erection Planning", "HSE Compliance"]', 'tariq@jazeerat.ae', 4, 100, -5),
('Marcus Chen', 'QA/QC Director', '/assets/team-marcus.jpg', 'Quality isn''t checked at the end, it''s built in.', '16 yrs', 'Sharjah, UAE', 'Marcus enforces uncompromising standards. Certified in advanced NDT (Non-Destructive Testing) methods, he ensures every beam leaving the yard exceeds client specifications.', '["NDT Level III", "ISO 9001 Auditing", "Metallurgy", "Client Handover"]', 'marcus@jazeerat.ae', -2, -90, -15),
('Fatima Zahra', 'Procurement Head', '/assets/team-fatima.jpg', 'We only source mill-certified, traceable steel.', '7 yrs', 'Dubai, UAE', 'Fatima maintains strategic relationships with top global steel mills. Her foresight in raw material procurement shielded Jazeerat from recent global supply chain disruptions.', '["Global Sourcing", "Contract Negotiation", "Supply Chain Resilience", "Mill Certification"]', 'fatima@jazeerat.ae', 1.5, 70, 25);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;

-- 6. Create policies to allow public read access
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on team" ON public.team FOR SELECT USING (true);
