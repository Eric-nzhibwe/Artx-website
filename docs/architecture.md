# ART Platform - System Architecture

## Overview

The ART platform is a client-side web application built with vanilla HTML, CSS, and JavaScript, using browser localStorage for data persistence.

## System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     ART PLATFORM                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Auth       │  │   Main       │  │  Challenges  │      │
│  │   System     │  │  Dashboard   │  │    Page      │      │
│  │              │  │              │  │              │      │
│  │ auth.html    │  │ index.html   │  │challenges.html│     │
│  │ auth.css     │  │ styles.css   │  │challenges.css│      │
│  │ auth.js      │  │ app.js       │  │challenges.js │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                  │               │
│         └─────────────────┼──────────────────┘               │
│                           │                                  │
│                  ┌────────▼────────┐                         │
│                  │   Admin Panel   │                         │
│                  │                 │                         │
│                  │   admin.html    │                         │
│                  │   admin.css     │                         │
│                  │   admin.js      │                         │
│                  └────────┬────────┘                         │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │  localStorage  │
                    │                │
                    │  Data Layer    │
                    └────────────────┘
```

## Data Flow

### 1. Authentication Flow

```
User → auth.html → auth.js
                     │
                     ├─ Signup: Create user → localStorage.artUsers
                     │                      → localStorage.artPlayer_{id}
                     │
                     └─ Login: Verify user → localStorage.artCurrentUser
                                           → Redirect to index.html
```

### 2. Challenge Creation Flow (Admin)

```
Admin → admin.html → Create Challenge Form
                           │
                           ├─ Upload Image (FileReader API)
                           ├─ Set Difficulty & Rules
                           ├─ Configure Scoring
                           │
                           └─ Save → localStorage.artChallenges
                                  → Update Dashboard Stats
```

### 3. Challenge Participation Flow (User)

```
User → challenges.html → View Active Challenges
                              │
                              ├─ Filter by Difficulty
                              ├─ Click Challenge
                              │
                              └─ Challenge Modal
                                    │
                                    ├─ Start Timer
                                    ├─ Write Interpretation
                                    ├─ Validate Word Count
                                    │
                                    └─ Submit
                                          │
                                          ├─ Calculate Score
                                          ├─ Save Submission → localStorage.artSubmissions
                                          ├─ Update User Prestige
                                          └─ Show Results
```

### 4. User Content Upload Flow

```
User → Upload Modal → Fill Form
                         │
                         ├─ Upload Image (FileReader API)
                         ├─ Add Title & Description
                         │
                         └─ Submit → localStorage.artUserContent
                                  → Status: "pending"

Admin → admin.html → User Content Section
                         │
                         ├─ Review Content
                         │
                         └─ Approve/Reject → Update Status
```

## Data Models

### User Object
```javascript
{
  id: "timestamp",
  username: "string",
  email: "string",
  password: "hashed_string",
  prestige: number,
  level: number,
  powerRank: "string",
  accessTier: "string",
  earnings: number,
  streak: number,
  lastLoginDate: "date_string",
  submissions: [],
  activities: [],
  alliance: object | null,
  family: [],
  isAdmin: boolean,
  createdAt: "ISO_date"
}
```

### Challenge Object
```javascript
{
  id: "timestamp",
  title: "string",
  difficulty: "easy|medium|hard|expert",
  timeLimit: number, // minutes
  challengeWindow: number, // hours
  description: "string",
  imageUrl: "base64_string",
  submissionRules: ["string"],
  minWordCount: number,
  maxWordCount: number,
  scoringCriteria: {
    creativity: number, // percentage
    relevance: number,
    detail: number
  },
  status: "active|paused",
  createdAt: "ISO_date",
  endsAt: "ISO_date",
  submissions: []
}
```

### Submission Object
```javascript
{
  id: "timestamp",
  userId: "string",
  username: "string",
  challengeId: "string",
  challengeTitle: "string",
  interpretation: "string",
  wordCount: number,
  score: number,
  submittedAt: "ISO_date",
  status: "scored|pending"
}
```

### User Generated Content Object
```javascript
{
  id: "timestamp",
  userId: "string",
  username: "string",
  title: "string",
  description: "string",
  category: "art|photography|digital|abstract|other",
  imageUrl: "base64_string",
  status: "pending|approved|rejected",
  rejectionReason: "string" | null,
  uploadedAt: "ISO_date"
}
```

## localStorage Keys

```
artUsers              → Array of all user objects
artCurrentUser        → Current logged-in user ID
artPlayer_{userId}    → Individual user profile
artChallenges         → Array of all challenges
artSubmissions        → Array of all submissions
artUserContent        → Array of user-generated content
```

## Scoring Algorithm

```javascript
function calculateScore(interpretation, challenge) {
  // 1. Get base score range by difficulty
  const baseScores = {
    easy: { min: 10, max: 30 },
    medium: { min: 30, max: 60 },
    hard: { min: 60, max: 100 },
    expert: { min: 100, max: 200 }
  };
  
  // 2. Calculate word ratio (detail factor)
  wordRatio = wordCount / maxWordCount;
  
  // 3. Apply creativity factor (0.7 - 1.0)
  creativityFactor = 0.7 + random(0.3);
  
  // 4. Calculate final score
  score = baseMin + (baseRange × wordRatio × creativityFactor);
  
  return Math.floor(score);
}
```

## Security Considerations

### Current Implementation (Demo):
- ✅ Client-side password hashing
- ✅ Session management via localStorage
- ✅ Admin role checking
- ✅ Input validation

### Production Requirements:
- ❌ Backend authentication server
- ❌ Secure password hashing (bcrypt)
- ❌ JWT tokens
- ❌ HTTPS/SSL
- ❌ Rate limiting
- ❌ CSRF protection
- ❌ XSS prevention
- ❌ SQL injection protection
- ❌ Image upload validation
- ❌ Content moderation

## Performance Considerations

### localStorage Limits:
- Maximum: 5-10MB per domain
- Current usage per item:
  - User object: ~1KB
  - Challenge with image: ~100-500KB
  - Submission: ~1-2KB
  - User content with image: ~100-500KB

### Optimization Strategies:
1. Compress images before storage
2. Limit number of stored challenges
3. Implement data cleanup
4. Use pagination for large lists
5. Lazy load images

## Browser Compatibility

### Required Features:
- localStorage API
- FileReader API
- ES6+ JavaScript
- CSS Grid & Flexbox
- Fetch API (future)

### Supported Browsers:
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

## Future Architecture (Phase 3)

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                          │
├─────────────────────────────────────────────────────────────┤
│  Components: Auth, Dashboard, Challenges, Admin             │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API / WebSocket
┌────────────────────────▼────────────────────────────────────┐
│                  Backend (Node.js/Express)                   │
├─────────────────────────────────────────────────────────────┤
│  Routes: /auth, /challenges, /submissions, /admin           │
│  Middleware: Auth, Validation, Rate Limiting                │
│  Services: Scoring, Image Processing, Notifications         │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    Database (MongoDB)                        │
├─────────────────────────────────────────────────────────────┤
│  Collections: users, challenges, submissions, content       │
└─────────────────────────────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  Cloud Storage (AWS S3)                      │
├─────────────────────────────────────────────────────────────┤
│  Images: Challenge prompts, User uploads                    │
└─────────────────────────────────────────────────────────────┘
```

## API Endpoints (Future)

```
POST   /api/auth/signup          - Create account
POST   /api/auth/login           - Login
POST   /api/auth/logout          - Logout
GET    /api/auth/me              - Get current user

GET    /api/challenges           - List challenges
GET    /api/challenges/:id       - Get challenge details
POST   /api/challenges           - Create challenge (admin)
PUT    /api/challenges/:id       - Update challenge (admin)
DELETE /api/challenges/:id       - Delete challenge (admin)

GET    /api/submissions          - List submissions
POST   /api/submissions          - Submit interpretation
GET    /api/submissions/:id      - Get submission details

GET    /api/content              - List user content
POST   /api/content              - Upload content
PUT    /api/content/:id/approve  - Approve content (admin)
PUT    /api/content/:id/reject   - Reject content (admin)

GET    /api/users                - List users (admin)
GET    /api/users/:id            - Get user details
GET    /api/leaderboard          - Get leaderboard
```

## Technology Stack

### Current (Phase 2):
- HTML5
- CSS3 (Grid, Flexbox, Gradients)
- Vanilla JavaScript (ES6+)
- localStorage API
- FileReader API
- Font Awesome Icons

### Future (Phase 3):
- React.js / Next.js
- Node.js / Express
- MongoDB / PostgreSQL
- AWS S3 / Cloudinary
- Socket.io (real-time)
- Redis (caching)
- JWT authentication
- Stripe (payments)

---

**Architecture Version**: 2.0
**Last Updated**: Phase 2 Complete
