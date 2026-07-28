-- ===============================================================================
-- JAZEERAT AL HADEED - SUPABASE DATA SYNC MIGRATION
-- ===============================================================================
-- Copy and paste this script into your Supabase SQL Editor to populate
-- your database tables with the updated high-quality assets.

-- 1. CLEAN EXISTING DATA
DELETE FROM public.projects;
DELETE FROM public.blogs;

-- 2. INSERT UPDATED HIGH-QUALITY PROJECTS
-- Note: The frontend dynamically generates the multi-image gallery based on these images.
INSERT INTO public.projects (title, location, scope, description, icon, image_url) VALUES
(
  'Industrial Fabrication Works',
  'Sharjah, UAE',
  'Portal frames, columns and steel decks',
  'A massive 40,000 sqm industrial fabrication facility requiring over 2,500 tons of structural steel. Included full portal frames, mezzanine decks, and heavy gantry crane runway beams.',
  'Factory',
  '/assets/project-truss-install.jpg'
),
(
  'Heavy Erection & Lift',
  'Kuwait',
  'Column splicing and crane rigging',
  'Heavy steel structural erection for industrial columns and A-frame modules. Coordinated complex heavy lifting and modular pre-assemblies at height.',
  'Truck',
  '/assets/project-crane-hoist.jpg'
),
(
  'Sobha One Facades',
  'Dubai, UAE',
  'Architectural facade steel and balcony structures',
  'Fabrication and erection of custom high-rise structural facade elements and balcony framing for the landmark Sobha One tower development in Dubai, adhering to AESS (Architecturally Exposed Structural Steel) finishing standards.',
  'Layers',
  '/assets/project-sobha-rendering.jpg'
),
(
  'Logistics Hub Canopy',
  'Qatar',
  'Warehouse steelwork and loading canopies',
  'A regional distribution center featuring wide-span steel trusses and extensive cantilevered loading canopies. Engineered for fast on-site bolted assembly, significantly reducing the main contractor''s erection timeline.',
  'Home',
  '/assets/project-facade-canopy.jpg'
),
(
  'Compliance Structural Splicing',
  'Riyadh, Saudi Arabia',
  'Rigorous NDT-tested columns and base assemblies',
  'Fabricated structural columns for municipal compliance, tested using advanced Ultrasonic Testing (UT) to verify penetration depths.',
  'ShieldCheck',
  '/assets/project-sobha-aerial.jpg'
);

-- 3. INSERT NEW DYNAMIC TECHNICAL INSIGHTS
INSERT INTO public.blogs (title, slug, excerpt, content, image_url, author, category, read_time) VALUES
(
  'The Future of CNC Plasma Cutting in Heavy Fabrication',
  'cnc-plasma-cutting-heavy-fabrication',
  'How CNC processing, automatic nesting, and multi-axis cutting are transforming structural steel fabrication timelines across the Gulf.',
  '<h2>The Shift to Shop Floor Automation</h2><p>Structural steel fabrication has historically been a labor-intensive craft, relying heavily on manual layout, marking, and oxy-fuel cutting. However, the rapid acceleration of infrastructure projects in the GCC region has necessitated a technological leap. Today, CNC plasma cutting stands at the center of this transformation, providing the speed and tolerances required for execution classes like EX3.</p><h2>Precision at Production Scale</h2><p>Modern CNC plasma cutters utilize high-definition plasma torches capable of piercing and profiling steel plates up to 50mm thickness. Controlled by advanced software systems, these machines interpret NC1 files directly exported from BIM models (such as Tekla Structures). This direct link from design to fabrication eliminates layout errors and guarantees a length tolerance of within ±0.5mm.</p><blockquote>"CNC automation isn''t just about cutting faster; it''s about integrating the drawing room directly with the cutting bed to eliminate human drafting transfer errors."</blockquote><h2>Nesting: Reducing Scrap & Optimizing Costs</h2><p>One of the key cost-saving benefits of modern CNC plasma cutting is automated plate nesting. Before cutting begins, nesting software calculates the optimal arrangement of parts on a single raw steel plate. By fitting connection plates, gussets, and stiffeners tightly together, we reduce scrap rate down to less than 6%, compared to a typical manual scrap rate of 15% to 20%.</p><h2>Edge Quality and Weld Preparation</h2><p>A major advantage of CNC plasma over oxy-fuel is the beveling capability. Multi-axis cutting heads can tilt during the profiling process, executing precise V, Y, and K bevels. This means plates emerge from the cutting bed pre-beveled and ready for immediate fit-up and welding. This eliminates the need for manual grinding, reducing overall weld preparation time by over 40%.</p>',
  '/assets/project-truss-install.jpg',
  'Eng. Ahmed Al-Mansoori',
  'Technical Insights',
  '5 min read'
),
(
  'Understanding AESS Code Specifications for Balcony Steelwork',
  'understanding-aess-balcony-steelwork',
  'A deep dive into Architecturally Exposed Structural Steel (AESS) categories, surface weld grinding requirements, and finishing tolerances.',
  '<h2>Bridging Architecture and Structure</h2><p>Architecturally Exposed Structural Steel (AESS) refers to steelwork that is both structural and highly visible to building occupants. In premium residential developments like Sobha One, balcony supports, canopy frames, and structural columns are featured design elements. Standard structural steel rules do not apply here; visual aesthetics are just as critical as load capacities.</p><h2>De-coding the AESS Categories</h2><p>Under the AISC Code of Standard Practice, AESS is divided into five distinct categories based on visibility distance and occupant contact:</p><ul><li><strong>AESS 1 (Basic):</strong> Visible at a distance, typically placed high up. Requires basic weld cleanup and corner rounding.</li><li><strong>AESS 2 (Feature):</strong> Viewed closer than AESS 1. Requires uniform weld profiles and alignment checks.</li><li><strong>AESS 3 (Feature Close-Up):</strong> Viewed at close range. Welds must be ground smooth, and surface defects filled.</li><li><strong>AESS 4 (Custom):</strong> Direct occupant contact (e.g., handrails or columns inside lobbies). Requires hand-crafted, completely seamless joints.</li></ul><blockquote>"Choosing the correct AESS classification prevents over-specifying costs on hidden steel while ensuring the high-touch areas remain visually flawless."</blockquote><h2>Weld Grinding and Contour Control</h2><p>For columns and brackets within occupant reach, all butt welds must be ground completely flush with the surrounding steel. Weld spatter is eliminated, and surface pitting is filled with epoxy paste before priming. Corner radii must be consistent across all rolled sections to create continuous, fluid silhouettes.</p><h2>Galvanizing & Coating Challenges</h2><p>Balcony structures are exposed directly to coastal elements, making hot-dip galvanizing essential for corrosion protection. However, galvanizing can leave rough zinc runs and vent-hole details. For AESS 3 and 4, we perform secondary post-galvanizing sweep-blasting and hand-filing, ensuring a perfectly smooth surface before applying the final architectural epoxy coat.</p>',
  '/assets/project-sobha-rendering.jpg',
  'Priya Sharma, Lead Designer',
  'Technical Insights',
  '8 min read'
),
(
  'Mitigating Thermal Expansion in Wide-Span Warehouse Frames',
  'mitigating-thermal-expansion-warehouse-frames',
  'Key engineering considerations for steel portal frames in desert climates where temperature fluctuations exceed 30°C within 12 hours.',
  '<h2>Extreme Climate of the Gulf</h2><p>In regions like Saudi Arabia and the UAE, steel structures face some of the most severe thermal cycles in the world. A warehouse roof can experience temperatures of 65°C under direct summer sunlight, dropping to 30°C overnight. This temperature differential of 35°C causes significant expansion and contraction, creating large stresses that must be accounted for during the detailing phase.</p><h2>Calculating Thermal Displacement</h2><p>Steel has a coefficient of thermal expansion of approximately 12 × 10^-6 per °C. For a typical 120-meter wide logistics hub, a 35°C temperature change results in a thermal movement of:<br/><br/><code>ΔL = L * α * ΔT = 120m * (12 × 10^-6) * 35 = 50.4mm</code><br/><br/>Over 5 centimeters of movement must be accommodated by the structural joints, or the columns will experience huge bending moments that can lead to structural failure.</p><h2>Design Solutions: Slotted Expansion Joints</h2><p>To allow the structure to breathe, engineers specify expansion joints. We cut slotted holes into the connections where roof purlins meet rafters. Under standard bolts, we fit Teflon or brass washers to minimize friction. This allows purlins to slide back and forth along the slots as the building expands and contracts, relieving stress buildup.</p><blockquote>"A warehouse frame that is restricted from thermal movement will find its own release point—usually by cracking connection welds or bowing base plate anchor bolts."</blockquote><h2>Base Plate & Foundation Modeling</h2><p>For wide-span frames, the column base plates are designed as pin-connections rather than fixed moments. This allows columns to tilt slightly outward at the top, distributing thermal strains safely to the foundation. Base plates are set on high-strength grout, and base anchor bolts are sleeved with flexible filler material to prevent shear fractures under thermal displacement.</p>',
  '/assets/project-sobha-aerial.jpg',
  'Eng. Khalid Al-Harbi, Senior Engineer',
  'Technical Insights',
  '6 min read'
);

-- 4. UPDATE SUBPAGE HERO ASSETS (VIDEO PATHS)
-- Updates default videos for subpages to map directly to their custom page-specific web-ready mp4 files.
UPDATE public.hero_assets SET asset_url = '/assets/services-hero.mp4' WHERE page_key = 'services';
UPDATE public.hero_assets SET asset_url = '/assets/facilities-hero.mp4' WHERE page_key = 'facilities';
UPDATE public.hero_assets SET asset_url = '/assets/projects-hero.mp4' WHERE page_key = 'projects';
UPDATE public.hero_assets SET asset_url = '/assets/contact-hero.mp4' WHERE page_key = 'contact';
UPDATE public.hero_assets SET asset_url = '/assets/about-hero.mp4' WHERE page_key = 'about';
