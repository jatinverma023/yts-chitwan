# Youth Thinkers' Society - Chitwan

A comprehensive full-stack web application for the Youth Thinkers' Society (YTS) Chitwan chapter, empowering Nepal's youth through leadership development, innovation, and community building. Built with React, Node.js, Express, and MongoDB.

## 🌟 About YTS Chitwan

Youth Thinkers' Society (YTS) Chitwan is a dynamic youth organization dedicated to nurturing young Nepalese leaders. For over 8 years, we've been creating transformative experiences that develop confident leaders and drive positive social change across Nepal.

### Our Mission

To create a dynamic platform where young Nepalese leaders can develop essential skills, engage in meaningful dialogue, and drive positive change in their communities through innovative programs, workshops, and collaborative initiatives.

### Our Vision

To be Nepal's premier youth organization, recognized for developing confident, socially-conscious leaders who contribute to building a more prosperous, inclusive, and sustainable Nepal for future generations.

### Core Values

- **Leadership Excellence**: Cultivating confident leaders who drive positive change
- **Innovation & Creativity**: Encouraging innovative thinking and creative solutions
- **Social Impact**: Every program designed to create meaningful impact
- **Inclusive Community**: Creating a space where every voice matters

## 🚀 Features

### Public Features

- **Home Page**: Interactive landing page with impact statistics and upcoming events
- **About Page**: Comprehensive information about YTS Chitwan's mission, vision, and achievements
- **Events Page**: Browse and register for upcoming events including CMUN, hackathons, and workshops
- **Team Page**: Meet the dedicated team members driving change
- **Contact Page**: Contact form for inquiries and partnerships

### Admin Features

- **Dashboard**: Comprehensive overview of users, events, contacts, and registrations
- **User Management**: View and manage user roles and permissions
- **Event Management**: Create, edit, and manage events with full CRUD operations
- **Contact Management**: View, respond to, and manage contact messages
- **Registration Management**: Handle event registrations and participant management

## 📊 Impact Statistics

- **500+ Youth Empowered** through our programs
- **50+ Events Organized** including 8 CMUN editions
- **8 Years Active** in youth development
- **25+ Partner Organizations** nationwide

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing for seamless navigation
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API communication

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing for security
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
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.x recommended)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn package manager

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

Create a `.env` file in the backend directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/yts-chitwan
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
```

### Database Setup

1. **Start MongoDB** (if running locally)

   ```bash
   mongod
   ```

2. **For cloud MongoDB** (recommended for production)
   - Create a MongoDB Atlas account
   - Set up a cluster and get your connection string
   - Update `MONGODB_URI` in your `.env` file

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend Development Server** (in a new terminal)

   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**
   - **Frontend**: http://localhost:5174
   - **Backend API**: http://localhost:5000
   - **Admin Panel**: http://localhost:5174/admin/login

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info (authenticated)
- `GET /api/auth/users` - Get all users (admin only)

### Events

- `GET /api/events` - Get all active events
- `GET /api/events/:id` - Get single event details
- `POST /api/events` - Create new event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)

### Contacts

- `GET /api/contacts` - Get all contacts with pagination (admin)
- `GET /api/contacts/:id` - Get single contact (admin)
- `POST /api/contacts` - Submit contact form (public)
- `PUT /api/contacts/:id/status` - Update contact status (admin)
- `DELETE /api/contacts/:id` - Delete contact (admin)

### Admin

- `GET /api/admin/stats` - Get dashboard statistics (admin)
- `GET /api/admin/users` - Get all users (admin)
- `GET /api/admin/events` - Get all events for admin (admin)
- `DELETE /api/admin/events/:id` - Delete event (admin)

### Registrations

- `POST /api/registrations/events/:eventId/register` - Register for an event (public)
- `GET /api/registrations/registrations` - Get all registrations (admin)
- `GET /api/registrations/events/:eventId/registrations` - Get registrations for specific event (admin)
- `PUT /api/registrations/registrations/:id/status` - Update registration status (admin)
- `DELETE /api/registrations/registrations/:id` - Delete registration (admin)

### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics (authenticated)

### Health Check

- `GET /api/health` - Server health check

## 🔧 Development Scripts

### Backend

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

We welcome contributions from the community! Here's how you can get involved:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and test thoroughly
4. **Commit your changes**
   ```bash
   git commit -m 'Add: Brief description of your changes'
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request** with a clear description of your changes

### Development Guidelines

- Follow the existing code style and structure
- Test your changes locally before submitting
- Update documentation if needed
- Ensure all tests pass

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Achievements & Recognition

- Successfully organized 8 editions of Chitwan Model United Nations
- Trained over 500 young leaders across Nepal
- Established partnerships with 25+ national and international organizations
- Recognized as 'Outstanding Youth Organization' by Nepal Youth Council
- Featured in major Nepali media outlets for community impact

## 👥 Team

**Youth Thinkers' Society Chitwan** - A dedicated team of young leaders committed to empowering Nepal's future through education, innovation, and community service.

### Connect With Us

- **Website**: [yts-chitwan.vercel.app](https://yts-chitwan.vercel.app) (if deployed)
- **Email**: Contact through our website contact form
- **Location**: Chitwan, Nepal

## 🙏 Acknowledgments

Special thanks to:

- All our volunteers and team members
- Partner organizations supporting youth development
- The community of young leaders participating in our programs
- Open source contributors and the developer community

---

**Built with ❤️ by the Youth Thinkers' Society Chitwan**

_Empowering Nepal's youth, one leader at a time._
