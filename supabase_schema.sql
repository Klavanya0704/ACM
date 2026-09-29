-- ========================================================
-- SITE ACM STUDENT CHAPTER — SUPABASE DATABASE SCHEMA
-- Sasi Institute of Technology & Engineering, Tadepalligudem
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL, -- Workshop, Competition, Seminar, Hackathon, Outreach
    mode VARCHAR(50) DEFAULT 'On Campus', -- On Campus, Online, Hybrid
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    speaker VARCHAR(255),
    speaker_title VARCHAR(255),
    attendance INTEGER DEFAULT 0,
    volunteers_count INTEGER DEFAULT 0,
    faculty_sponsors_count INTEGER DEFAULT 0,
    collaboration VARCHAR(255),
    topics TEXT[], -- Array of topic strings
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_upcoming BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. EVENT REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    roll_number VARCHAR(100),
    department VARCHAR(100),
    year_of_study VARCHAR(50),
    phone VARCHAR(50),
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TEAM MEMBERS TABLE (LEADERSHIP)
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL, -- Chair, Vice Chair, Treasurer, Secretary, Membership Chair, Faculty Sponsor
    category VARCHAR(50) NOT NULL, -- Officer, Sponsor, Core Team
    department VARCHAR(100) DEFAULT 'Computer Science & Engineering',
    email VARCHAR(255),
    linkedin_url TEXT,
    github_url TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. MEMBERS DIRECTORY TABLE
CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    acm_member_id VARCHAR(100),
    department VARCHAR(100) NOT NULL,
    year_of_study VARCHAR(50) NOT NULL,
    acm_role VARCHAR(100) DEFAULT 'Chapter Member',
    joined_date DATE,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Hackathon, Competition, Award, Milestone
    description TEXT NOT NULL,
    achievement_date DATE NOT NULL,
    winners TEXT[], -- Student names
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Workshops, Events, Hackathons, Team, Guest Sessions, Outreach
    image_url TEXT NOT NULL,
    event_id UUID REFERENCES events(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. WORKSHOPS TABLE
CREATE TABLE IF NOT EXISTS workshops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    topic_category VARCHAR(100) NOT NULL, -- AI/ML, Cybersecurity, Web Development, Cloud, Programming
    level VARCHAR(50) DEFAULT 'Intermediate', -- Beginner, Intermediate, Advanced
    duration VARCHAR(50),
    description TEXT NOT NULL,
    prerequisites TEXT,
    registration_link TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    badge_text VARCHAR(100),
    link_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES FOR OPTIMAL PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_team_display_order ON team_members(display_order);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Public READ Access Policies
CREATE POLICY "Public Read Events" ON events FOR SELECT USING (true);
CREATE POLICY "Public Read Team" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public Read Members" ON members FOR SELECT USING (true);
CREATE POLICY "Public Read Achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Workshops" ON workshops FOR SELECT USING (true);
CREATE POLICY "Public Read Announcements" ON announcements FOR SELECT USING (true);

-- Public INSERT for Contact & Event Registrations
CREATE POLICY "Public Insert Contact" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Event Registration" ON event_registrations FOR INSERT WITH CHECK (true);

-- SEED DATA: VERIFIED LEADERSHIP
INSERT INTO team_members (name, role, category, department, email, display_order) VALUES
('Dr. Sivakumar Perumal', 'Faculty Sponsor', 'Sponsor', 'Computer Science & Engineering', 'sivakumarperumal@sasi.ac.in', 1),
('Manuri Susatwik', 'Chair', 'Officer', 'Computer Science & Engineering', 'susatwik.m@sasi.ac.in', 2),
('Durga Satya Sai Charan Kona', 'Vice Chair', 'Officer', 'Computer Science & Engineering', 'charan.k@sasi.ac.in', 3),
('Akhil Kumar Yandamuri', 'Treasurer', 'Officer', 'Computer Science & Engineering', 'akhil.y@sasi.ac.in', 4),
('Kolluri Durga Sai Lavanya', 'Secretary', 'Officer', 'Computer Science & Engineering', 'lavanya.k@sasi.ac.in', 5),
('Teja Kiran Chandu Kanuri', 'Membership Chair', 'Officer', 'Computer Science & Engineering', 'tejakiran.k@sasi.ac.in', 6)
ON CONFLICT DO NOTHING;

-- SEED DATA: VERIFIED DOCUMENTED EVENTS
INSERT INTO events (title, slug, category, mode, event_date, location, description, speaker, attendance, volunteers_count, collaboration, is_featured, is_upcoming) VALUES
(
    'PRAYATNA 2.0',
    'prayatna-2-0',
    'Hackathon',
    'On Campus',
    '2025-07-02 09:00:00+05:30',
    'SASI Institute of Technology & Engineering, Tadepalligudem',
    'PRAYATNA 2.0 was an intensive internal hackathon organized by the SITE ACM Student Chapter in collaboration with the AITR ACM Student Chapter, Indore. Over 100 students participated in building innovative technology solutions across domains including Web, AI, and Mobile App Development.',
    'SITE ACM Mentors',
    100,
    15,
    'AITR ACM Student Chapter, Indore',
    true,
    false
),
(
    'Cyber Security in Day0',
    'cyber-security-in-day0',
    'Seminar',
    'On Campus',
    '2025-07-29 10:30:00+05:30',
    'SASI Institute Auditorium, Tadepalligudem',
    'A comprehensive guest lecture on Day-Zero vulnerability detection, ethical hacking, threat hunting, and modern cybersecurity defense strategies. Delivered by renowned academic expert Dr. Sibi Chakravarthi.',
    'Dr. Sibi Chakravarthi (Professor, School of Computing, VIT-AP)',
    200,
    29,
    'VIT-AP University Guest Lecture Series',
    true,
    false
),
(
    'Hour of Code – A Thought of Inspiring Young Minds',
    'hour-of-code',
    'Outreach',
    'On Campus',
    '2025-12-29 09:30:00+05:30',
    'ZPH Schools (Veerampalem & Kommugudem, West Godavari District, AP)',
    'An impactful community outreach program where SITE ACM student volunteers visited rural ZPH Schools in Veerampalem and Kommugudem to introduce school students to fundamental computer science concepts, programming logic, AI awareness, and interactive coding exercises.',
    'SITE ACM Student Volunteers & Faculty Team',
    120,
    26,
    'ZPH Schools Community Outreach',
    true,
    false
)
ON CONFLICT (slug) DO NOTHING;
