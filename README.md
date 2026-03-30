# ⚠️ Warning
This project uses cookies for authentication.

When deploying frontend and backend on different domains (cross-domain), **Chrome and some brownsers currently block these cookies**, causing authentication issues.

At the time I deploy this website, **FireFox still allow these cookies**, but it may also block them in the future due to stricter privacy policies.

If that happens, I will update authentication approach to return and store tokens directly from the backend (e.g., via Authorization headers) instead of relying on cookies or redeploy the app on a same-site domain.

# 💬 RTC Chat App

A real-time chat application built with MERN stack and Socket.IO.

This project demonstrates how modern chat systems work with real-time communication.

---

# 🎯 Purpose of This Project

This repository was created for practicing and learning **real-time communication in web applications.**

The main goals of this project are:

- Understanding SocketIO workflow
- Learning real-time messaging flow
- Practicing backend development with Node.js & Socket-based communication
- Implementing peer-to-peer connections
- Handling real-time events between clients
- Exploring how chat apps function internally

This is a **learning** project, not a production-ready chat system.

---

# ✨ Features

💬 Real-time messaging with Socket.IO  
⚡ Instant bi-directional communication  
🖼️ Image upload & storage via Cloudinary  
📧 Email sending using Resend  
🤖 Bot detection & protection using Arcjet  
👥 Multi-user chat support  
🔐 Basic validation & security handling  
🚀 Modern React frontend with responsive UI

---

# 🔄 Communication Flow

1. User opens the **React** client.
2. Client connects to the server via **Socket.IO.**
3. Users join chat rooms and send messages.
4. Messages are emitted and broadcast in real-time.
5. Media (images) are uploaded to **Cloudinary.**
6. Optional actions (like welcome email) trigger email via **Resend.**
7. Requests are filtered/protected using **Arcjet** for bot detection.

---

# 👤 Demo Accounts

You can log in using one of the following demo accounts:

| Username | Password |
|--------|--------|
| goku@example.com | 123456 |
| natsu@example.com | 123456 |
| naruto@example.com | 123456 |

Alternatively, you can create a new account to try the authentication system.

---

# 🛠 Tech Stack

**Frontend**
- HTML/CSS
- JavaScript (ES6+)
- React
- TailwindCSS

**Backend**
- NodeJS
- Express
- Socket.IO

**Services & Tools**
- Cloudinary (store image)
- Resend (send welcome email)
- Arcjet (bot detection & protection)  
- DaisyUI
- React Hot Toast
- Lucide React

---

# 🚀 Deployment

This project is deployed on **Vercel** and **Render**.

>Live Demo:  
https://echotalk-rtc-chat-app.vercel.app/

---

# 📚 Possible Improvements

- Implement **refresh tokens**
- Implement **email verification and password reset**


