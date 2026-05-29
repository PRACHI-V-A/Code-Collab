CodeCollab - Real-Time Collaborative Coding Platform
Overview
CodeCollab is a full-stack collaborative coding platform designed to enable multiple users to work together inside a shared workspace in real time.
The platform combines:
•	React.js frontend
•	Monaco Editor
•	Socket.IO real-time communication
•	Spring Boot REST APIs
•	PostgreSQL persistence layer
The goal of the project is to provide a cloud-based collaborative development environment similar to VS Code Live Share, Replit Multiplayer, and CodeSandbox.
________________________________________
Architecture
Frontend (React + Monaco)
            |
            |
        Axios
            |
            ▼
Spring Boot REST API
            |
            ▼
      PostgreSQL
            ▲
            |
        Socket.IO
            |
            ▼
 Real-Time Collaboration Layer
The system consists of two major subsystems:
1. Persistence Layer
Responsible for:
•	Room creation
•	Room validation
•	File persistence
•	Workspace restoration
Implemented using:
•	Spring Boot
•	Spring Data JPA
•	PostgreSQL
________________________________________
2. Real-Time Collaboration Layer
Responsible for:
•	Live code synchronization
•	Live chat
•	Participant tracking
•	File events synchronization
Implemented using:
•	Node.js
•	Express.js
•	Socket.IO
________________________________________
Technology Stack
Frontend
•	React.js
•	React Router DOM
•	Axios
•	Monaco Editor
•	Tailwind CSS
•	Socket.IO Client
________________________________________
Backend
Spring Boot
Used for:
•	Room management
•	File persistence
•	Database interaction
Libraries:
•	Spring Web
•	Spring Data JPA
•	PostgreSQL Driver
________________________________________
Socket Server
Used for:
•	Real-time communication
•	Room-based collaboration
Libraries:
•	Express.js
•	Socket.IO
•	CORS
________________________________________
Database
PostgreSQL
Database Name:
codecollab
________________________________________
Current Features
1. Collaborative Workspaces
Users can create unique collaborative rooms.
Each room receives:
roomCode
Example:
e437dd4d
Room information is stored permanently inside PostgreSQL.
________________________________________
2. Room Validation
When a user attempts to join a room:
Join Room
        ↓
Frontend Validation
        ↓
Spring Boot API
        ↓
PostgreSQL Check
        ↓
Allow / Deny Access
Invalid rooms are rejected.
________________________________________
3. Real-Time Code Synchronization
Implemented using Socket.IO.
Workflow:
User A types code
        ↓
Socket Event
        ↓
Server Broadcast
        ↓
User B receives update
Changes are reflected instantly across connected clients.
________________________________________
4. Real-Time Team Chat
Users inside the same workspace can communicate through live chat.
Features:
•	Room-based messaging
•	Instant delivery
•	Shared conversation history during session
________________________________________
5. Participant Tracking
Tracks active users inside a room.
Updates automatically when:
•	User joins
•	User disconnects
Participant list is synchronized across all clients.
________________________________________
6. Multi-File Workspace
Users can:
•	Create files
•	Delete files
•	Rename files
•	Switch files
Supported languages include:
•	Python
•	JavaScript
•	TypeScript
•	Java
•	C
•	C++
•	PHP
•	Go
•	Rust
•	SQL
•	HTML
•	CSS
•	JSON
•	XML
•	Markdown
•	Shell
Language mode is detected automatically from file extension.
________________________________________
7. Real-Time File Events
The following actions are synchronized:
File Creation
User A creates file
        ↓
Socket Broadcast
        ↓
User B receives file
File Deletion
Delete File
        ↓
All clients updated
File Rename
Rename File
        ↓
All clients updated
________________________________________
Database Persistence
Room Persistence
Rooms are stored permanently.
Table:
rooms
Columns:
id
room_code
created_at
________________________________________
File Persistence
Files are stored permanently.
Table:
project_files
Columns:
id
room_id
file_name
language
content
updated_at
________________________________________
Smart Save Mechanism
Initial implementation:
Every Save
        ↓
INSERT
Problem:
Duplicate rows were created.
Improved implementation:
File Exists?
      |
 YES  |  NO
      |
 UPDATE   INSERT
Uses:
findByRoomIdAndFileName()
to maintain a single database record per file.
________________________________________
Workspace Restoration
When a workspace opens:
Room Open
        ↓
Fetch Files API
        ↓
PostgreSQL Query
        ↓
Restore Workspace
Previously:
Refresh
        ↓
Everything Lost
Now:
Refresh
        ↓
Workspace Restored
________________________________________
REST API Endpoints
Room APIs
Create Room
POST /api/rooms/create
Creates a persistent room.
________________________________________
Validate Room
GET /api/rooms/{roomCode}
Checks whether room exists.
________________________________________
File APIs
Save File
POST /api/files/save/{roomCode}
Creates or updates a file.
________________________________________
Load Files
GET /api/files/{roomCode}
Returns all files belonging to a room.
________________________________________
Socket Events
Room Events
join-room
participants-update
________________________________________
Chat Events
send-message
receive-message
________________________________________
Code Events
code-change
receive-code
________________________________________
File Events
create-file
file-created

delete-file
file-deleted

rename-file
file-renamed
________________________________________
Persistence Strategy
CodeCollab currently uses a hybrid persistence model.
Real-Time Layer
Socket.IO handles:
•	Live code synchronization
•	Chat synchronization
•	File synchronization
•	Participant updates
Data is transferred instantly between connected clients.
________________________________________
Database Layer
PostgreSQL stores:
•	Rooms
•	Files
•	File content
Each file is uniquely identified using:
roomId + fileName
This ensures:
One Room
      ↓
One File
      ↓
One Database Entry
instead of creating duplicate rows on every save.
________________________________________
Autosave Mechanism
Current implementation:
User Types
      ↓
Debounce Timer (3 seconds)
      ↓
Save Trigger
      ↓
PostgreSQL Update
This significantly reduces database writes while maintaining persistence.

Current Project Status
Current Project Status
Implemented:
✅ Room Creation
✅ Room Validation
✅ PostgreSQL Integration
✅ Multi-User Collaboration
✅ Real-Time Chat
✅ Real-Time Code Synchronization
✅ Real-Time Participant Tracking
✅ Multi-File Workspaces
✅ File Creation
✅ File Renaming
✅ File Deletion
✅ Real-Time File Synchronization
✅ Room-Based File Persistence
✅ Workspace Restoration
✅ Smart Database Updates (No Duplicate File Entries)
✅ Manual Save System
✅ Debounced Autosave
✅ Room-Based Workspace Loading
✅ Persistent Collaborative Editing
Current Architecture:
React + Monaco Editor
        ↓
Socket.IO
        ↓
Node.js Real-Time Server
        ↓
Spring Boot REST API
        ↓
PostgreSQL
________________________________________
Upcoming Features
Phase 1
Phase 1 (Next Features)
Ctrl + S Support
Professional editor shortcut.
Ctrl + S
      ↓
Immediate Save
________________________________________
Save Status Indicator
Display save state to users.
Examples:
Saving...
Saved
Unsaved Changes
________________________________________
Collaborative Cursor Presence
Show active cursor positions of all users.
Example:
Prachi editing line 14
Akshay editing line 27
________________________________________
User Join / Leave Notifications
Prachi joined the workspace
Akshay left the workspace
________________________________________
Improved Autosave Strategy
Current:
3-second debounced save
Future:
Debounced Save
      +
Page Exit Save
      +
Periodic Backup Save
for higher reliability.
________________________________________
Phase 2
Folder Structure
src/
├── components/
├── pages/
└── services/
Nested directories.
________________________________________
Project Tree Explorer
VS Code style file explorer.
________________________________________
File Upload
Import:
•	.zip projects
•	source files
•	templates
________________________________________
Phase 3
User Authentication
•	Signup
•	Login
•	JWT Authentication
________________________________________
User Ownership
Track:
User
    ↓
Owned Rooms
________________________________________
Phase 4
Permissions
Roles:
•	Owner
•	Editor
•	Viewer
________________________________________
Access Control
Control:
•	Editing
•	File Management
•	Invitations
________________________________________
Phase 5
Online Presence
•	Typing indicators
•	Active cursors
•	User colors
________________________________________
Collaborative Cursor Tracking
Google Docs style presence.
________________________________________
Phase 6
Code Execution Engine
Run code securely using isolated containers.
Supported languages:
•	Python
•	Java
•	JavaScript
•	C++
•	C
________________________________________
Docker Sandbox
Secure execution environment.
________________________________________
Phase 7
Collaborative Terminal
Shared terminal session.
________________________________________
Build & Compile Support
Compile projects directly from browser.
________________________________________
Long-Term Vision
Transform CodeCollab into a cloud-based collaborative IDE capable of:
•	Real-time coding
•	Team collaboration
•	Persistent workspaces
•	Project management
•	Secure code execution
•	Multi-user development workflows
similar to:
•	VS Code Live Share
•	Replit Multiplayer
•	CodeSandbox
•	GitHub Codespaces
