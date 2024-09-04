# **BlinkChat**

BlinkChat is a simple, real-time chat application that allows users to create unique chat rooms without needing to log in. Just generate a link, share it, and start chatting. Messages are automatically deleted after a set period, ensuring your conversations are temporary and private.

**Note: This project, is a side project created for the purpose of learning and experimenting with Firebase and Next.js. It's a fun and educational exploration of real-time web technologies, focusing on building a simple and engaging chat application.**

## Getting Started

First, run the develipment Server

```
yarn
yarn run dev
```
## **Features**

- **Instant Chat Room Creation:** Generate a unique chat link with one click—no login required.
- **Real-Time Messaging:** Messages are synced across all participants instantly.
- **Ephemeral Messages:** Chat messages automatically expire and are deleted after a set time (Still deciding).
- **Anonymous Chatting:** Users can chat without revealing their identity; random pet names are assigned to maintain privacy.
- **Easy to Use:** A minimalistic and user-friendly interface for seamless chatting.

## **Tech Stack**

- **Frontend:** Next.js (React), TypeScript, Material UI for styling.
- **Backend:** Firebase (Firestore and Cloud Functions).
- **Real-Time Communication:** Firebase Firestore for syncing messages.
- **Deployment:** Vercel for hosting the Next.js application.

## **Project Structure**

```plaintext
blinkchat/
├── public/                        # Static assets
├── src/
│   ├── app/
│   │   ├── chat/                  # Chat page for each session
│   │   │   └── [id]/page.tsx      # Dynamic route for chat rooms
│   │   ├── layout.tsx             # Main layout component
│   │   └── page.tsx               # Home page for link generation
│   ├── components/                # Reusable Components
│   └── styles/                    # Global and component-specific styles
├── .env.local                     # Environment variables (local setup)
├── next.config.mjs                # Next.js configuration
└── README.md                      # It's me, Readme!
