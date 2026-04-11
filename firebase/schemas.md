# Firebase Firestore Schema for MiniFreelance Platform

## Overview
This document defines the data structure for all collections in the Firestore database for the freelance platform.

---

## Users Collection (`users`)

### Document ID: Firebase Auth UID
```javascript
{
  uid: string,                    // Firebase Authentication UID (document ID)
  email: string,                  // User email address
  name: string,                    // Display name
  avatar: string|null,              // Profile photo URL
  role: string,                    // 'client' | 'freelancer'
  
  // Profile Information
  phone: string|null,              // Phone number
  location: string|null,             // City, Country
  bio: string|null,                // Professional bio/description
  isVerified: boolean,              // Email verification status
  
  // Client-specific fields
  companyName: string|null,          // Company name (clients only)
  workType: string|null,            // Type of work (clients only)
  
  // Freelancer-specific fields
  skills: string[],                 // Array of skill names
  experience: string,                 // 'beginner' | 'intermediate' | 'advanced' | 'expert'
  hourlyRate: number|null,           // Hourly rate in USD
  portfolioUrl: string|null,         // Portfolio website URL
  education: string|null,             // Education background
  availability: string,             // 'available' | 'busy' | 'away'
  
  // Timestamps
  createdAt: string,                // ISO 8601 timestamp
  updatedAt: string,                // ISO 8601 timestamp
}
```

---

## Jobs Collection (`jobs`)

### Document ID: Auto-generated Firestore ID
```javascript
{
  title: string,                   // Job title
  description: string,              // Detailed job description
  category: string,                 // Job category
  budget: {
    min: number,                   // Minimum budget in USD
    max: number,                   // Maximum budget in USD
    type: string                    // 'fixed' | 'hourly' | 'project'
  },
  
  // Client Information
  clientId: string,                // Firebase UID of job poster
  clientName: string,              // Name of client
  clientCompany: string|null,       // Client company name
  
  // Job Details
  duration: string,                 // Project duration
  experience: string,               // Required experience level
  skills: string[],                 // Required skills
  attachments: string[],             // File URLs
  
  // Status & Location
  status: string,                  // 'open' | 'in_progress' | 'completed' | 'cancelled'
  location: string|null,            // Remote/On-site location
  isRemote: boolean,               // Whether job is remote
  
  // Timeline
  postedAt: string,                // When job was posted
  deadline: string|null,            // Application deadline
  
  // Bidding
  totalBids: number,              // Number of bids received
  averageBid: number|null,        // Average bid amount
  
  // Award Information
  awardedTo: string|null,          // Firebase UID of awarded freelancer
  awardedAt: string|null,          // When job was awarded
  completedAt: string|null         // When job was completed
}
```

---

## Bids Collection (`bids`)

### Document ID: Auto-generated Firestore ID
```javascript
{
  jobId: string,                   // Job ID reference
  freelancerId: string,             // Firebase UID of bidder
  clientId: string,                // Firebase UID of client
  
  // Bid Details
  amount: number,                  // Bid amount in USD
  type: string,                    // 'fixed' | 'hourly'
  hourlyRate: number|null,          // Hourly rate if hourly bid
  estimatedHours: number|null,       // Estimated hours for hourly bids
  
  // Proposal
  proposal: string,                 // Detailed proposal text
  timeline: string,                 // Delivery timeline
  attachments: string[],             // Portfolio/attachment URLs
  
  // Status
  status: string,                  // 'pending' | 'accepted' | 'rejected' | 'withdrawn'
  submittedAt: string,              // When bid was submitted
  respondedAt: string|null,         // When client responded
  
  // Freelancer Info (cached)
  freelancerName: string,           // Name of freelancer
  freelancerAvatar: string|null,     // Freelancer avatar
  freelancerSkills: string[],       // Freelancer skills
  freelancerRating: number|null,     // Freelancer average rating
}
```

---

## Messages Collection (`messages`)

### Document ID: Auto-generated Firestore ID
```javascript
{
  jobId: string|null,              // Associated job ID (if job-related)
  projectId: string|null,           // Associated project ID (if ongoing)
  
  // Participants
  senderId: string,                // Firebase UID of sender
  receiverId: string,              // Firebase UID of receiver
  senderName: string,              // Name of sender
  senderAvatar: string|null,        // Avatar of sender
  
  // Message Content
  subject: string,                  // Message subject
  content: string,                  // Message body
  attachments: string[],             // File URLs
  
  // Status
  isRead: boolean,                 // Whether message has been read
  isDeleted: boolean,               // Whether message is deleted
  type: string,                     // 'message' | 'proposal' | 'notification'
  
  // Timestamps
  sentAt: string,                  // When message was sent
  readAt: string|null,             // When message was read
}
```

---

## Reviews Collection (`reviews`)

### Document ID: Auto-generated Firestore ID
```javascript
{
  jobId: string,                   // Associated job ID
  clientId: string,                // Firebase UID of client
  freelancerId: string,             // Firebase UID of freelancer
  
  // Review Details
  rating: number,                  // 1-5 star rating
  title: string,                   // Review title
  comment: string,                  // Review text
  
  // Categories
  communication: number,            // 1-5 rating for communication
  quality: number,                 // 1-5 rating for work quality
  timeliness: number,              // 1-5 rating for on-time delivery
  professionalism: number,        // 1-5 rating for professionalism
  
  // Status
  isVerified: boolean,              // Whether review is verified
  response: string|null,            // Public response from reviewed party
  
  // Timestamps
  createdAt: string,                // When review was left
  updatedAt: string|null,            // When review was updated
}
```

---

## Notifications Collection (`notifications`)

### Document ID: Auto-generated Firestore ID
```javascript
{
  userId: string,                   // Firebase UID of recipient
  type: string,                     // 'bid' | 'message' | 'job' | 'review' | 'system'
  
  // Content
  title: string,                   // Notification title
  message: string,                  // Notification message
  icon: string,                     // Icon name (Lucide icon)
  
  // References
  relatedId: string|null,           // Related document ID (job, message, etc.)
  relatedType: string|null,         // Related collection ('jobs', 'messages', etc.)
  
  // Status
  isRead: boolean,                 // Whether notification has been read
  actionUrl: string|null,           // Deep link for action
  
  // Timestamps
  createdAt: string,                // When notification was created
  readAt: string|null,             // When notification was read
}
```

---

## Files Collection (`files`)

### Document ID: Auto-generated Firestore ID
```javascript
{
  uploaderId: string,               // Firebase UID of uploader
  originalName: string,             // Original filename
  fileName: string,                 // Unique filename (generated)
  mimeType: string,                 // File MIME type
  size: number,                    // File size in bytes
  
  // Storage
  storageUrl: string,               // Firebase Storage URL
  storagePath: string,              // Firebase Storage path
  downloadUrl: string,              // Download URL (with token)
  
  // Metadata
  description: string|null,         // File description
  tags: string[],                   // Searchable tags
  
  // Timestamps
  uploadedAt: string,               // When file was uploaded
  lastAccessed: string|null,       // When file was last accessed
  
  // Access Control
  isPublic: boolean,               // Whether file is publicly accessible
  allowedUsers: string[],           // List of allowed user IDs (if private)
}
```

---

## Indexes for Performance

### Composite Indexes Needed

```javascript
// Users Collection
users: [
  { fields: ['email'], queryScope: 'Collection' },
  { fields: ['role'], queryScope: 'Collection' },
  { fields: ['skills'], queryScope: 'Collection' },
  { fields: ['location'], queryScope: 'Collection' }
]

// Jobs Collection
jobs: [
  { fields: ['clientId'], queryScope: 'Collection' },
  { fields: ['status'], queryScope: 'Collection' },
  { fields: ['category'], queryScope: 'Collection' },
  { fields: ['skills'], queryScope: 'Collection' },
  { fields: ['budget.min', 'budget.max'], queryScope: 'Collection' },
  { fields: ['postedAt'], queryScope: 'Collection' }
]

// Bids Collection
bids: [
  { fields: ['jobId'], queryScope: 'Collection' },
  { fields: ['freelancerId'], queryScope: 'Collection' },
  { fields: ['status'], queryScope: 'Collection' },
  { fields: ['submittedAt'], queryScope: 'Collection' }
]

// Messages Collection
messages: [
  { fields: ['receiverId'], queryScope: 'Collection' },
  { fields: ['senderId'], queryScope: 'Collection' },
  { fields: ['jobId'], queryScope: 'Collection' },
  { fields: ['isRead'], queryScope: 'Collection' },
  { fields: ['sentAt'], queryScope: 'Collection' }
]

// Notifications Collection
notifications: [
  { fields: ['userId'], queryScope: 'Collection' },
  { fields: ['type'], queryScope: 'Collection' },
  { fields: ['isRead'], queryScope: 'Collection' },
  { fields: ['createdAt'], queryScope: 'Collection' }
]
```

---

## Security Rules

### Firestore Security Rules (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read public profile information
    match /users/{userId} {
      allow read: if request.auth != null && 
        resource.data.keys().hasAll(['name', 'avatar', 'role', 'skills', 'experience']);
    }
    
    // Job access rules
    match /jobs/{jobId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
        request.auth.uid == resource.data.clientId;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.clientId;
    }
    
    // Bid access rules
    match /bids/{bidId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.freelancerId || 
         request.auth.uid == resource.data.clientId);
      allow create: if request.auth != null && 
        request.auth.uid == resource.data.freelancerId;
      allow update: if request.auth != null && 
        request.auth.uid == resource.data.freelancerId;
      allow delete: if request.auth != null && 
        request.auth.uid == resource.data.freelancerId;
    }
    
    // Message access rules
    match /messages/{messageId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.senderId || 
         request.auth.uid == resource.data.receiverId);
    }
    
    // Review access rules
    match /reviews/{reviewId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
        request.auth.uid == resource.data.clientId;
      allow update: if request.auth != null && 
        request.auth.uid == resource.data.clientId;
    }
    
    // Notification access rules
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // File access rules
    match /files/{fileId} {
      allow read: if request.auth != null && 
        (resource.data.isPublic == true || 
         request.auth.uid == resource.data.uploaderId || 
         request.auth.uid in resource.data.allowedUsers);
      allow write: if request.auth != null && 
        request.auth.uid == resource.data.uploaderId;
    }
  }
}
```

---

## Usage Examples

### Creating a New User
```javascript
import { doc, setDoc } from './firebase';

const createUserProfile = async (firebaseUser, userData) => {
  const userRef = doc(db, 'users', firebaseUser.uid);
  
  const profileData = {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName || userData.name,
    avatar: firebaseUser.photoURL || null,
    role: userData.role,
    phone: userData.phone || null,
    location: userData.location || null,
    bio: userData.bio || null,
    companyName: userData.companyName || null,
    workType: userData.workType || null,
    skills: userData.skills || [],
    experience: userData.experience || 'beginner',
    hourlyRate: userData.hourlyRate || null,
    portfolioUrl: userData.portfolioUrl || null,
    education: userData.education || null,
    availability: userData.availability || 'available',
    isVerified: firebaseUser.emailVerified || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  await setDoc(userRef, profileData);
};
```

### Querying Jobs
```javascript
import { collection, query, where, orderBy, limit, getDocs } from './firebase';

const getOpenJobs = async (category = null, skills = []) => {
  let q = query(collection(db, 'jobs'), 
    where('status', '==', 'open'),
    orderBy('postedAt', 'desc'),
    limit(20)
  );
  
  if (category) {
    q = query(q, where('category', '==', category));
  }
  
  if (skills.length > 0) {
    q = query(q, where('skills', 'array-contains-any', skills));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
```

This schema provides a comprehensive foundation for your freelance platform with proper indexing, security rules, and scalability considerations.
