<div align="center">
  <h1>Portfolio REST API</h1>
  <p><strong>A comprehensive, scalable RESTful API for managing a professional portfolio</strong></p>
  
  [![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)](https://nodejs.org/)
  [![NestJS](https://img.shields.io/badge/NestJS-11.x-red?logo=nestjs)](https://nestjs.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?logo=postgresql)](https://www.postgresql.org/)
  [![License](https://img.shields.io/badge/License-UNLICENSED-red)](#license)
</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Database](#database)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)

---

## 📖 About

Portfolio REST API is a production-ready backend service built with **NestJS** and **TypeScript**. It provides a comprehensive set of endpoints for managing a professional portfolio, including user authentication, project showcase, skills management, experience tracking, and more.

This API is designed to be:
- **Scalable** - Built with NestJS architecture best practices
- **Secure** - JWT authentication and role-based access control
- **Type-safe** - Full TypeScript coverage
- **Well-documented** - Swagger API documentation
- **Database-driven** - PostgreSQL with TypeORM

---

## ✨ Features

### Core Features
- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control (RBAC)
- 👤 **User Management** - User profiles and account management
- 📁 **Project Portfolio** - Showcase projects with categories and technologies
- 🎯 **Skills Management** - Track technical and professional skills
- 💼 **Experience Tracking** - Document work experience and achievements
- 🎓 **Education Records** - Manage educational background
- 📜 **Certificates** - Maintain certification records
- 💬 **Testimonials** - Collect client/colleague recommendations
- 📧 **Contact Management** - Handle contact inquiries and messages
- 📰 **Newsletter** - Email subscription management
- 🖼️ **File Upload** - Cloudinary integration for media management
- 📊 **Analytics** - Track portfolio visitor analytics
- ⚙️ **Site Settings** - Configurable portfolio settings
- 🔔 **Email Notifications** - Nodemailer integration for notifications

### Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting with express-rate-limit
- Security headers with Helmet
- CORS protection
- Role-based access control (Admin, User)

### Developer Features
- 🧪 Unit & E2E Testing (Jest)
- 📝 Comprehensive API documentation (Swagger)
- 🔍 ESLint configuration
- 🎨 Code formatting with Prettier
- 🚀 Production-ready deployment configs

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js 22.x |
| **Framework** | NestJS 11.x |
| **Language** | TypeScript 5.x |
| **Database** | PostgreSQL 14+ |
| **ORM** | TypeORM 0.3.x |
| **Authentication** | Passport.js + JWT |
| **API Docs** | Swagger/OpenAPI |
| **Cloud Storage** | Cloudinary |
| **Email Service** | Nodemailer |
| **Testing** | Jest |
| **Code Quality** | ESLint, Prettier |
| **Deployment** | Railway.app, Render, Docker-ready |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 22.x or higher ([Download](https://nodejs.org/))
- **npm** 10.x or higher
- **PostgreSQL** 14 or higher ([Download](https://www.postgresql.org/))
- **Git** ([Download](https://git-scm.com/))

### Optional
- **Docker** & **Docker Compose** for containerized development
- **Cloudinary Account** for image/media management
- **Email Service** credentials (Gmail, SendGrid, etc.)

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd portfolio-rest-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory:

```env
# Application
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
# OR individual fields:
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=portfolio_db

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRATION=7d

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service (Optional)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_FROM=noreply@yourportfolio.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## ⚙️ Configuration

### Database Setup

#### Using PostgreSQL Locally
```bash
# Create database
createdb portfolio_db

# Run migrations (if available)
npm run migration:run
```

#### Using Docker
```bash
# Start PostgreSQL container
docker run --name portfolio-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=portfolio_db \
  -p 5432:5432 \
  -d postgres:15
```

---

## 🏃 Running the Application

### Development Mode
```bash
npm run start:dev
```
Starts the application in watch mode with hot-reloading.

### Production Mode
```bash
npm run build
npm run start:prod
```
Builds the application and runs it in production mode.

### Debug Mode
```bash
npm run start:debug
```
Starts the application with debugging enabled.

Once running, your API will be available at: `http://localhost:3000`

**API Documentation (Swagger):** `http://localhost:3000/api/docs`

---

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get current user profile

### Users
- `GET /users` - Get all users (Admin)
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user profile
- `DELETE /users/:id` - Delete user (Admin)

### Projects
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `POST /projects` - Create new project
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Skills
- `GET /skills` - Get all skills
- `GET /skills/:id` - Get skill by ID
- `POST /skills` - Add new skill
- `PATCH /skills/:id` - Update skill
- `DELETE /skills/:id` - Delete skill

### Experience
- `GET /experiences` - Get all experiences
- `POST /experiences` - Add new experience
- `PATCH /experiences/:id` - Update experience
- `DELETE /experiences/:id` - Delete experience

### Education
- `GET /education` - Get all education records
- `POST /education` - Add education
- `PATCH /education/:id` - Update education
- `DELETE /education/:id` - Delete education

### Certificates
- `GET /certificates` - Get all certificates
- `POST /certificates` - Add certificate
- `PATCH /certificates/:id` - Update certificate
- `DELETE /certificates/:id` - Delete certificate

### Testimonials
- `GET /testimonials` - Get all testimonials
- `POST /testimonials` - Add testimonial
- `PATCH /testimonials/:id` - Update testimonial
- `DELETE /testimonials/:id` - Delete testimonial

### Contact
- `POST /contact` - Submit contact form
- `GET /contact` - Get all contact messages (Admin)
- `DELETE /contact/:id` - Delete contact message

### Newsletter
- `POST /newsletter/subscribe` - Subscribe to newsletter
- `GET /newsletter/subscribers` - Get all subscribers (Admin)
- `POST /newsletter/unsubscribe` - Unsubscribe

### Analytics
- `GET /analytics` - Get analytics data (Admin)
- `POST /analytics/track` - Track visitor event
- `GET /analytics/events` - Get all events

### Settings
- `GET /settings` - Get portfolio settings
- `PATCH /settings` - Update settings (Admin)

### Uploads
- `POST /uploads` - Upload file
- `GET /uploads` - Get all uploads
- `DELETE /uploads/:id` - Delete upload

---

## 📁 Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── guards/              # JWT & Roles guards
│   ├── strategies/          # Passport strategies
│   ├── decorators/          # Custom decorators
│   └── dto/                 # Data transfer objects
│
├── users/                   # User management
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── entities/
│   └── dto/
│
├── projects/                # Project portfolio
│   ├── projects.controller.ts
│   ├── projects.service.ts
│   ├── entities/
│   └── dto/
│
├── skills/                  # Skills management
├── experiences/             # Experience tracking
├── education/               # Education records
├── certificates/            # Certification management
├── testimonials/            # Testimonials collection
├── contact/                 # Contact form handling
├── newsletter/              # Email subscriptions
├── mail/                    # Email service
├── uploads/                 # File upload management
├── cloudinary/              # Cloudinary integration
├── analytics/               # Visitor analytics
├── settings/                # Portfolio settings
├── common/                  # Shared utilities
│   ├── decorators/
│   ├── filters/             # Exception filters
│   ├── guards/              # Custom guards
│   └── pipes/               # Validation pipes
│
├── types/                   # TypeScript type definitions
├── app.module.ts            # Root module
├── app.controller.ts        # Root controller
├── app.service.ts           # Root service
└── main.ts                  # Application entry point

test/                        # E2E tests
eslint.config.mjs            # ESLint configuration
tsconfig.json               # TypeScript config
nest-cli.json               # NestJS CLI config
package.json                # Dependencies
railway.json                # Railway deployment config
```

---

## 🗄️ Database Schema

Key entities:
- **User** - Portfolio owner account
- **Project** - Portfolio projects with technologies
- **Skill** - Technical/professional skills
- **Experience** - Work experience records
- **Education** - Educational background
- **Certificate** - Professional certificates
- **Testimonial** - Client/colleague testimonials
- **ContactMessage** - Contact form submissions
- **Newsletter** - Email subscribers
- **Upload** - File storage metadata
- **AnalyticsEvent** - Visitor analytics events
- **Settings** - Portfolio configuration

---

## 🚀 Deployment

### Railway.app (Recommended)
1. Push code to GitHub
2. Connect Railway to your GitHub repository
3. Set environment variables in Railway dashboard
4. Deploy automatically on push

See [Railway Deployment Guide](README.deploy.md) for detailed instructions.

### Render
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Configure environment variables
5. Deploy

### Docker (Self-hosted)
```bash
docker build -t portfolio-api .
docker run -p 3000:3000 --env-file .env portfolio-api
```

---

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Watch Mode (Development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:cov
```

### E2E Tests
```bash
npm run test:e2e
```

---

## 🎨 Code Quality

### Linting
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

---

## 📝 License

This project is UNLICENSED. See the LICENSE file for more information.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

## 🔗 Useful Links

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io/)
- [Passport.js Documentation](http://www.passportjs.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Cloudinary API Reference](https://cloudinary.com/documentation/image_upload_api_reference)

---

**Made with ❤️ for professional portfolios**
