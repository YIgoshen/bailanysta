# Bailanysta

**Bailanysta** is a social networking platform where users can create posts and explore a feed of posts from other users.  
The application is designed with both backend and frontend components. The UI can be implemented as a web app or an iOS app.  

This project demonstrates a full-stack implementation with authentication, posting.  

---

## Features

- User profile page with the ability to create posts.  
- Feed page that displays posts from all users (author + text).  
- Authentication (sign up / log in).  
- Backend integration with API built using **Express.js**.  
- Frontend implemented with **React**.  
- Routing between profile and feed pages.  
- Posts are stored and fetched from a **MongoDB** database.  

---

## Installation & Setup

### Prerequisites
- Node.js **>=16**  
- npm **>=8**  
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)  

---

### Backend (Express.js)

1. Clone this repository and navigate to the project root.  
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Configure MongoDB connection:  
   In `index.js`, replace the connection string with your own MongoDB credentials:  
   ```js
   .connect("mongodb+srv://USERNAME:PASSWORD@cluster0.j0z8mxp.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0")
   ```
4. Start the server in development mode:  
   ```bash
   npm run start:dev
   ```

---

### Frontend (React)

1. Navigate to the `frontend` folder:  
   ```bash
   cd frontend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Run the development server:  
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.  

---

## API Endpoints (Examples)

### Authentication
- **POST** `/auth/register` → register a new user  
  ```json
  { "username": "john", "password": "123456" }
  ```
- **POST** `/auth/login` → log in a user  
  ```json
  { "username": "john", "password": "123456" }
  ```

### Posts
- **POST** `/posts` → create a new post  
  ```json
  { "text": "Hello Bailanysta!" }
  ```
- **GET** `posts` → fetch all posts  


---

## Design & Development Process

- **Component structure**: Built using modern React practices with a clear hierarchy to separate profile, feed, and authentication pages.  
- **Routing**: Implemented with React Router to enable navigation between pages.  
- **API integration**: All external services (MongoDB, authentication logic) are called from the server side for security.  
- **Authentication flow**: Implemented basic user auth to manage sessions and allow posting.  

---

## Unique Approaches & Methodologies

- The project demonstrates a **full-stack workflow** (React + Express + MongoDB).  
- API-first approach: backend endpoints were designed before connecting the frontend.  
- Separation of concerns: frontend and backend are decoupled, making the system easier to maintain and scale.  

---

## Trade-offs & Decisions

- **Frontend framework**: React was chosen for its component-based structure and wide ecosystem.  
- **Backend framework**: Express.js was selected for simplicity and fast prototyping.  
- **Database**: MongoDB fits well with JSON-like data structures and integrates easily with Node.js.  

---

## Known Issues / Limitations

- Basic error handling (e.g., invalid credentials, failed post requests) could be improved.  
- No advanced security features yet (e.g., rate limiting, JWT refresh tokens).  
- UI/UX is minimal and could be enhanced with design improvements.  
- Posts currently support only text (no media uploads).  

---

## Why This Tech Stack?

- **React** → modern, fast, and widely used frontend library for building scalable UIs.  
- **Express.js** → minimal yet powerful Node.js framework for building REST APIs.  
- **MongoDB** → flexible, document-oriented database that integrates seamlessly with JavaScript/Node.js.  

