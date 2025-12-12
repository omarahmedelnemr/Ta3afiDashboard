# Ta3afy Dashboard

A modern React-based admin dashboard for managing the Ta3afy mental health platform.

## Overview

This dashboard provides comprehensive management tools for administrators to oversee the Ta3afy system, including doctor verification, content management, analytics, and user monitoring.

## Features

### 🔐 Authentication & Authorization
- Secure login system with token-based authentication
- Protected routes with role-based access control (Admin/Supervisor)
- Automatic redirection for unauthorized access
- Session management with localStorage
- 401 error handling with automatic logout

### 👨‍⚕️ Doctor Management System

#### Doctor Hub (`/doctors`)
Central management page with quick access to:
- Unverified doctors (pending applications)
- Verified doctors (approved professionals)

#### Unverified Doctors Page (`/doctors/unverified`)
- View all pending doctor applications
- Search functionality by name
- Doctor profile cards showing:
  - Profile image, name, and title
  - Description and specialization
  - Gender, language, rating
  - Completed and pending sessions
  - Verification status badge
- Click on any card to view detailed information

#### Verified Doctors Page (`/doctors/verified`)
- View all approved doctors
- Same search and display features as unverified page
- Access to detailed profiles for management

#### Doctor Info Page (`/doctors/info/:doctorID`)
Comprehensive doctor profile with:
- **Personal Information**: Name, email, gender, birth date, language, online status
- **Professional Details**:
  - Education records
  - Experience records
  - Certifications
  - Specializations/Tags
- **Business Information**:
  - Pricing details (rate per minutes)
  - Available days and schedule
- **Statistics**: Rating, completed sessions, pending sessions
- **Account Status**: Active status, email confirmation
- **Actions**:
  - Verify button (for unverified doctors)
  - Reject button (with rejection reason modal)
  - Confirmation dialogs for safety

### 📊 Dashboard Analytics (`/dashboard`)
Enhanced UI with modern design:
- Key metrics overview cards:
  - Total Patients
  - Total Doctors
  - Total Articles
  - Total Posts
- Interactive charts:
  - Appointment status pie chart
  - Time-series graphs for posts, articles, and appointments
- Modern card design with:
  - Gradient backgrounds
  - Shadow effects and hover animations
  - Color-coded icons
  - Responsive layout

### 📝 Content Management
- **Posts** (`/posts`): Manage community posts
- **Posts Pending** (`/posts-pending`): Moderate pending posts
- **Articles** (`/articles`): Manage blog articles
- **Article Details** (`/articles/:articleID`): View individual articles

### 👥 User Management
- **Supervisors** (`/supervisors`): Admin-only page for managing supervisors
- **Patient Profiles** (`/profile/patient/:patientID`): View patient information
- **Doctor Profiles** (`/profile/doctor/:doctorID`): View public doctor profiles

## Technology Stack

- **Framework**: React 18.2.0
- **Routing**: React Router v6
- **UI Library**: MDB React UI Kit v7.0.0
- **Icons**: FontAwesome v6.5.1
- **Charts**: Chart.js v4.4.2 with react-chartjs-2
- **HTTP Client**: Axios v1.6.2
- **Real-time**: Socket.io-client v4.7.4
- **Authentication**: Firebase v10.12.0

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ProtectedRoute.js # Route protection component
│   ├── SideNavBar.js     # Main navigation
│   └── styles/           # Component styles
├── pages/               # Page components
│   ├── Dashboard/       # Analytics dashboard
│   ├── Doctors/         # Doctor management pages
│   │   ├── DoctorsPage.js       # Doctor hub
│   │   ├── UnverifiedDoctors.js # Pending doctors
│   │   ├── VerifiedDoctors.js   # Approved doctors
│   │   └── DoctorInfo.js        # Detailed doctor info
│   ├── Login/           # Authentication
│   ├── Posts/           # Post management
│   ├── Articles/        # Article management
│   ├── Supervisors/     # Supervisor management
│   └── Profiles/        # User profiles
├── public Func/         # Utility functions
│   ├── axiosAuth.js     # Axios with auth interceptors
│   ├── globalVar.js     # Environment config
│   └── DateFix.js       # Date utilities
└── App.js              # Main router setup
```

## Completed Tasks

### ✅ Task 1: UI/UX Improvements
**Enhanced Dashboard Design:**
- Modern gradient backgrounds
- Improved card designs with shadows and smooth hover effects
- Better typography and spacing
- Color-coded metric cards with icons
- Enhanced responsive design for mobile devices

**Navigation Improvements:**
- Gradient sidebar background
- Smooth transitions and animations
- Better visual hierarchy
- Improved mobile menu

### ✅ Task 2: Authentication & Authorization
**Security Enhancements:**
- Created `ProtectedRoute` component for route-level authentication
- Implemented role-based access control (admin/supervisor)
- Added automatic redirection for unauthenticated users
- Protected all internal pages from unauthorized access
- Token validation on every protected route

**Implementation Details:**
- Routes now wrapped in `<ProtectedRoute>` components
- Admin-only routes require `requiredRole="admin"` prop
- Automatic redirect to `/Login` for missing tokens
- Automatic redirect to `/dashboard` for insufficient permissions

### ✅ Task 3: Doctor Management System
**New Pages Created:**
1. **Doctor Hub** (`DoctorsPage.js`)
   - Modern card-based navigation
   - Quick access to unverified and verified doctors
   - Icon-based visual indicators

2. **Unverified Doctors** (`UnverifiedDoctors.js`)
   - Full API integration with `/admin/unverified-doctors`
   - Real-time search functionality
   - Doctor cards with verification badges
   - Click-through to detailed information

3. **Verified Doctors** (`VerifiedDoctors.js`)
   - Full API integration with `/admin/verified-doctors`
   - Identical UI to unverified page for consistency
   - Management capabilities

4. **Doctor Info** (`DoctorInfo.js`)
   - Comprehensive doctor profile display
   - Full API integration with `/admin/doctor-info`
   - Dynamic action buttons based on verification status
   - Verify action with confirmation dialog
   - Reject action with required reason modal
   - Beautiful, organized layout for all doctor information
   - Responsive design for all screen sizes

**Routes Added:**
- `/doctors` - Doctor management hub
- `/doctors/unverified` - Unverified doctors list
- `/doctors/verified` - Verified doctors list
- `/doctors/info/:doctorID` - Detailed doctor information

**API Integration:**
- ✅ GET `/admin/unverified-doctors` - Fetch pending doctors
- ✅ GET `/admin/verified-doctors` - Fetch approved doctors
- ✅ GET `/admin/doctor-info?doctorID=...` - Fetch doctor details
- ✅ POST `/admin/verify-doctor` - Approve a doctor
- ✅ POST `/admin/reject-doctor` - Reject with reason

## API Documentation


#### THE api mini docs:
GET /admin/unverified-doctors, Takes None
Returns Example:
[
    {
        "id": "219MJcLpFTR4RuWbtkXQDQBz6tB2",
        "name": "marouf",
        "title": "مدرب تنمية بشرية",
        "birthDate": "2002-02-09T22:00:00.000Z",
        "profileImage": "http://api.taafy.omarelnemr.xyz/file/1762102429407.jpg",
        "gender": "male",
        "description": "مدرب تطوير ذات",
        "language": "ar",
        "online": true,
        "starRate": 0,
        "completedSessions": 0,
        "pendingSessions": 0,
        "verified": false,
        "rejectionReason": null,
        "registrationDate": "2025-12-12T14:44:17.000Z"
    },
    {
        "id": "9otO5ocDsrSSoiq0c9QiShHAweN2",
        "name": "cvxx",
        "title": "personal dev",
        "birthDate": "2025-11-15T06:59:05.000Z",
        "profileImage": "http://api.taafy.omarelnemr.xyz/profilePic/default.png",
        "gender": "male",
        "description": "gfg",
        "language": "en",
        "online": true,
        "starRate": 0,
        "completedSessions": 0,
        "pendingSessions": 0,
        "verified": false,
        "rejectionReason": null,
        "registrationDate": "2025-12-12T14:44:17.000Z"
    },
    {
        "id": "mnqzT8JAYOecLK4ZnZYdGvVyg522",
        "name": "esraa ",
        "title": "مش عارفه ",
        "birthDate": "2025-12-06T17:01:11.000Z",
        "profileImage": "http://api.taafy.omarelnemr.xyz/profilePic/default.png",
        "gender": "female",
        "description": "مش عارفه ",
        "language": "en",
        "online": true,
        "starRate": 0,
        "completedSessions": 0,
        "pendingSessions": 0,
        "verified": false,
        "rejectionReason": null,
        "registrationDate": "2025-12-12T14:44:17.000Z"
    }
]

GET /admin/verified-doctors, Takes None
Returns Example:
[
    {
        "id": "219MJcLpFTR4RuWbtkXQDQBz6tB2",
        "name": "marouf",
        "title": "مدرب تنمية بشرية",
        "birthDate": "2002-02-09T22:00:00.000Z",
        "profileImage": "http://api.taafy.omarelnemr.xyz/file/1762102429407.jpg",
        "gender": "male",
        "description": "مدرب تطوير ذات",
        "language": "ar",
        "online": true,
        "starRate": 0,
        "completedSessions": 0,
        "pendingSessions": 0,
        "verified": true,
        "rejectionReason": null,
        "registrationDate": "2025-12-12T14:44:17.000Z"
    },
    {
        "id": "9otO5ocDsrSSoiq0c9QiShHAweN2",
        "name": "cvxx",
        "title": "personal dev",
        "birthDate": "2025-11-15T06:59:05.000Z",
        "profileImage": "http://api.taafy.omarelnemr.xyz/profilePic/default.png",
        "gender": "male",
        "description": "gfg",
        "language": "en",
        "online": true,
        "starRate": 0,
        "completedSessions": 0,
        "pendingSessions": 0,
        "verified": true,
        "rejectionReason": null,
        "registrationDate": "2025-12-12T14:44:17.000Z"
    },
    {
        "id": "mnqzT8JAYOecLK4ZnZYdGvVyg522",
        "name": "esraa ",
        "title": "مش عارفه ",
        "birthDate": "2025-12-06T17:01:11.000Z",
        "profileImage": "http://api.taafy.omarelnemr.xyz/profilePic/default.png",
        "gender": "female",
        "description": "مش عارفه ",
        "language": "en",
        "online": true,
        "starRate": 0,
        "completedSessions": 0,
        "pendingSessions": 0,
        "verified": true,
        "rejectionReason": null,
        "registrationDate": "2025-12-12T14:44:17.000Z"
    }
]

GET /admin/doctor-info, Takes doctorID
Returns Example:
{
    "doctorInfo": {
        "id": "219MJcLpFTR4RuWbtkXQDQBz6tB2",
        "name": "marouf",
        "title": "مدرب تنمية بشرية",
        "birthDate": "2002-02-09T22:00:00.000Z",
        "profileImage": "http://api.taafy.omarelnemr.xyz/file/1762102429407.jpg",
        "gender": "male",
        "description": "مدرب تطوير ذات",
        "language": "ar",
        "online": true,
        "starRate": 0,
        "completedSessions": 0,
        "pendingSessions": 0,
        "verified": false,
        "rejectionReason": null,
        "registrationDate": "2025-12-12T14:44:17.000Z",
        "certifications": [
            {
                "id": 2,
                "title": "iti"
            }
        ],
        "education": [
            {
                "id": 3,
                "title": "all things without brain disorders and sexual disorders"
            }
        ],
        "experience": [
            {
                "id": 5,
                "title": "2 years"
            }
        ],
        "tags": [
            {
                "id": 6,
                "tag": "very fast"
            }
        ],
        "pricing": [
            {
                "id": 5,
                "moneyRate": 30,
                "minutesRate": 68
            }
        ],
        "reviews": [],
        "availableDays": [
            {
                "id": 4,
                "dayName": "Sunday"
            },
            {
                "id": 13,
                "dayName": "Saturday"
            },
            {
                "id": 14,
                "dayName": "Monday"
            },
            {
                "id": 17,
                "dayName": "Thursday"
            }
        ]
    },
    "loginInfo": {
        "email": "ahmedmarouf664@gmail.com",
        "active": true,
        "confirmed": true
    }
}

POST /admin/verify-doctor, Takes doctorID
Returns Example: "Done"

POST /admin/reject-doctor, Takes doctorID,rejectionReason
Returns Example: "Done"
