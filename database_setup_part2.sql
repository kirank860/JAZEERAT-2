-- 1. Create the enquiries table
CREATE TABLE public.enquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the blogs table
CREATE TABLE public.blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  author text NOT NULL,
  category text NOT NULL,
  read_time text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Insert sample SEO blog posts
INSERT INTO public.blogs (title, slug, excerpt, content, image_url, author, category, read_time) VALUES
(
  'The Future of CNC Plasma Cutting in Heavy Fabrication',
  'future-of-cnc-plasma-cutting',
  'How automated plasma and laser systems are reducing rework, increasing speed, and changing the economics of structural steel fabrication.',
  '<h1>The Evolution of Precision</h1><p>In structural steel, tolerances dictate speed. Historically, manual cutting introduced micro-variations that cascaded into massive delays during site erection. Today, the integration of advanced CNC plasma and laser systems has fundamentally shifted the economics of fabrication.</p><p>At Jazeerat Al Hadeed, our transition to fully automated cutting lines has yielded a 40% reduction in rework and allowed us to guarantee ±0.5mm tolerances on complex joints. This means faster erection times for main contractors and significantly lower risk profiles for major industrial projects.</p><h2>Why Precision Matters On Site</h2><p>When you are hoisting a 10-ton beam 50 meters into the air, the connection plate must align perfectly. Every millimeter of error translates to hours of grinding, welding, and re-certifying at height. By controlling the exact parameters in a controlled environment, we ensure that every bolt drops in seamlessly.</p>',
  '/assets/slides/slide-1.webp',
  'Khalid Ibrahim',
  'Technical Insights',
  '4 min read'
),
(
  'Ensuring NDT Compliance on Offshore Oil & Gas Structures',
  'ndt-compliance-offshore-structures',
  'A deep dive into the stringent non-destructive testing requirements for mid-stream processing plants and offshore pipe racks.',
  '<h1>Uncompromising Standards</h1><p>Offshore environments are unforgiving. Wind, saltwater corrosion, and constant dynamic loading mean that a structural failure is not just an inconvenience—it is a catastrophe. This is why Non-Destructive Testing (NDT) is the backbone of our QA/QC process for Oil & Gas contracts.</p><h2>The Arsenal of Inspection</h2><p>Our inspectors utilize a combination of Ultrasonic Testing (UT), Magnetic Particle Inspection (MPI), and Radiographic Testing (RT) to look deep inside the welds. For recent projects in Oman, we achieved a 100% first-pass pass rate on critical full-penetration welds.</p><p>We believe that quality isn''t checked at the end; it is built into the process. From strictly controlled consumable storage to continuous welder recertification, our compliance framework guarantees that our steel stands up to the harshest environments on Earth.</p>',
  '/assets/slides/slide-2.webp',
  'Marcus Chen',
  'Industry News',
  '6 min read'
),
(
  'Delivering the 40,000 SQM Sharjah Logistics Hub: A Case Study',
  'sharjah-logistics-hub-case-study',
  'How our logistics and fabrication teams coordinated to deliver over 2,500 tons of structural steel ahead of schedule.',
  '<h1>Scale and Speed</h1><p>When tasked with delivering the structural steel for a massive new regional distribution center in Sharjah, the challenge wasn''t just fabrication—it was logistics. The site required over 2,500 tons of steel, including wide-span trusses and extensive cantilevered loading canopies.</p><h2>The Erection Sequence</h2><p>By breaking the project down into highly specific delivery phases, we ensured that the site erection team never waited for material, and equally important, they were never overwhelmed by early deliveries. Our pre-assembly strategy allowed us to bolt together complex trusses on the ground, minimizing the time cranes spent holding pieces in the air.</p><p>The result? The main contractor shaved three weeks off their erection timeline, and the facility opened ahead of schedule. This is the power of integrated fabrication and logistics.</p>',
  '/assets/slides/slide-3.webp',
  'James Okafor',
  'Company Updates',
  '5 min read'
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- 5. Create policies
-- Anyone can read blogs
CREATE POLICY "Allow public read access on blogs" ON public.blogs FOR SELECT USING (true);

-- Anyone can insert enquiries (but not read them)
CREATE POLICY "Allow public insert on enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
