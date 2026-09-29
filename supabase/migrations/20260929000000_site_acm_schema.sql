-- ========================================================
-- SITE ACM STUDENT CHAPTER — OFFICIAL SUPABASE MIGRATION
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
    topics TEXT[],
    image_url TEXT,
    registration_status VARCHAR(50) DEFAULT 'Open',
    is_featured BOOLEAN DEFAULT FALSE,
    is_upcoming BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. EVENT REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    event_title VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    roll_number VARCHAR(100),
    department VARCHAR(100),
    year VARCHAR(50),
    phone VARCHAR(50),
    college VARCHAR(255) DEFAULT 'Sasi Institute of Technology & Engineering',
    status VARCHAR(50) DEFAULT 'Registered', -- Registered, Attended, Cancelled
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. MEMBERSHIP REQUESTS TABLE (STUDENT INTEREST FORM)
CREATE TABLE IF NOT EXISTS membership_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    college VARCHAR(255) DEFAULT 'Sasi Institute of Technology & Engineering',
    roll_number VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    department VARCHAR(100) NOT NULL,
    year_of_study VARCHAR(50) NOT NULL,
    acm_status VARCHAR(50) DEFAULT 'Not an ACM Member',
    interests TEXT[],
    statement TEXT,
    consent BOOLEAN DEFAULT TRUE,
    status VARCHAR(50) DEFAULT 'pending', -- pending, reviewed, approved, rejected
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. OFFICIAL MEMBERS DIRECTORY TABLE
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

-- 5. TEAM MEMBERS TABLE (CHAPTER OFFICERS & SPONSOR)
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

-- 6. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    achievement_date DATE NOT NULL,
    winners TEXT[],
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    event_id UUID REFERENCES events(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. WORKSHOPS TABLE
CREATE TABLE IF NOT EXISTS workshops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    topic_category VARCHAR(100) NOT NULL,
    level VARCHAR(50) DEFAULT 'Intermediate',
    duration VARCHAR(50),
    description TEXT NOT NULL,
    prerequisites TEXT,
    registration_link TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_registrations_event ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_membership_requests_status ON membership_requests(status);
CREATE INDEX IF NOT EXISTS idx_team_display_order ON team_members(display_order);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public READ Access
CREATE POLICY "Public Read Events" ON events FOR SELECT USING (true);
CREATE POLICY "Public Read Members" ON members FOR SELECT USING (true);
CREATE POLICY "Public Read Team" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public Read Achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Workshops" ON workshops FOR SELECT USING (true);

-- Public INSERT Access for Form Submissions
CREATE POLICY "Public Insert Event Registrations" ON event_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Membership Requests" ON membership_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Contact Messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Admin Full Access Policies (authenticated users)
CREATE POLICY "Admin All Access Events" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access Registrations" ON event_registrations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access Membership Requests" ON membership_requests FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access Members" ON members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access Contact" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');
