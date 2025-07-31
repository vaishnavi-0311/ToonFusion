# 🎬 ToonFusion

Open in browser
Visit http://localhost:8080 to start exploring ToonFusion.

ToonFusion is a creative web application for users to explore, create, and share film or animated content. It provides a clean interface to post images with content, view user profiles, and interact with detailed post views.

---

## 🌟 Features

- 🏠 **Home Feed**: View all public posts in a styled card layout.
- ➕ **Create Posts**: Upload a new post with an image, username, profile image, and description.
- 👤 **User Profiles**: Each user has a profile page displaying their posts and profile image.
- 🔍 **Search Support**: Navigate to user content via search.
- 📝 **Post Details**: View and manage individual post content.

---

## 📁 Folder Structure

ToonFusion/
│
├── views/
│ ├── index.ejs # Displays all posts (Home page)
│ ├── profile.ejs # Shows user profile with their posts
│ └── show.ejs # Displays a detailed view of a single post
│
├── public/
│ └── uploads/ # Stores uploaded images
│
├── style.css # Custom styles for UI
├── server.js # Express app server (not uploaded but assumed)

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, EJS (Embedded JavaScript Templates)
- **Backend**: Node.js, Express.js
- **Image Upload**: Handled with Multer middleware (assumed)
- **Templating**: EJS for dynamic content rendering
