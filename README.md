# YTS Chitwan - Youth Technology Society

A full-stack web application for the Youth Technology Society (YTS) Chitwan chapter, built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### Public Features

- **Home Page**: Welcome page with society information
- **About Page**: Information about YTS Chitwan
- **Events Page**: Browse upcoming and past events
- **Team Page**: Meet the team members
- **Contact Page**: Contact form for inquiries

### Admin Features

- **Dashboard**: Overview of users, events, and contacts
- **User Management**: View and manage user roles (admin/user)
- **Event Management**: Create, edit, and delete events
- **Contact Management**: View and manage contact messages
- **Registration Management**: Handle event registrations

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
yts-chitwan/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── isAdmin.js
│   ├── models/
│   │   ├── Contact.js
│   │   ├── Event.js
│   │   ├── Registration.js
│   │   ├── TeamMember.js
│   │   └── User.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── contact.js
│   │   ├── dashboard.js
│   │   ├── events.js
│   │   ├── health.js
│   │   └── registrations.js
│   ├── uploads/
│   ├── create_admin.js
│   ├── delete_all_users.js
│   ├── inspect_db.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   ├── team-achievement-banner.jpg
│   │   ├── vite.svg
│   │   └── yts-team-hero.jpg
│   ├── src/
│   │   ├── assets/
│   │   │   └── yts-logo.png
│   │   ├── components/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AdminProtection.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EventsManager.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Reveal.jsx
│   │   ├── hooks/
│   │   │   └── useDarkMode.js
│   │   ├── layouts/
│   │   │   └── AdminLayout.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── AdminContacts.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminEvents.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminRegistrations.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EventRegistration.jsx
│   │   │   ├── EventRegistrationsDetail.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Team.jsx
│   │   │   └── admin/
│   │   │       └── AdminEventForm.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
├── README.md
├── TODO.md
└── vercel.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.x recommended)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/yts-chitwan.git
   cd yts-chitwan
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/yts-chitwan
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

### Database Setup

1. **Start MongoDB** (if running locally)

   ```bash
   mongod
   ```

2. **Create Admin User** (optional)
   ```bash
   cd backend
   node create_admin.js
   ```

### Running the Application

1. **Start Backend**

   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend** (in a new terminal)

   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:5000

## 📡 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Events

- `GET /api/events` - Get all events
- `POST /api/events` - Create event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)

### Contacts

- `GET /api/contact` - Get all contacts (admin)
- `POST /api/contact` - Submit contact form
- `PUT /api/contact/:id/status` - Update contact status (admin)
- `DELETE /api/contact/:id` - Delete contact (admin)

### Admin

- `GET /api/admin/stats` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

### Registrations

- `GET /api/registrations` - Get event registrations (admin)
- `POST /api/registrations` - Register for event
- `DELETE /api/registrations/:id` - Cancel registration

### Dashboard

- `GET /api/dashboard/stats` - Get public dashboard stats

## 🔧 Development Scripts

### Backend

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🚀 Deployment

### Vercel Deployment

The project is configured for Vercel deployment with the `vercel.json` file.

1. **Build Commands**
   - Frontend: `npm run build`
   - Backend: Uses serverless functions

2. **Environment Variables**
   Set the following in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `VITE_API_URL` (for frontend)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Youth Technology Society Chitwan** - Organization
- Project maintained by YTS Chitwan members

## 📞 Contact

For questions or support, please contact us through the contact form on the website or reach out to the YTS Chitwan team.

---

Built with ❤️ by the Youth Technology Society Chitwan
