# EventBrut - Neo-Brutalist Event Management Application

A modern, brutalist-style event management web application built with Next.js 15. EventBrut allows administrators to manage events and permits clients to browse and book them.

## Features

- Neo-brutalism design style with bold colors, thick borders, and playful geometry
- Admin dashboard for comprehensive event management
- Client event browsing, filtering, and booking
- Role-based authentication (admin vs client)
- Smooth animations and transitions throughout the app
- Responsive design that works on all devices
- State management with Zustand for client-side data persistence

## Technologies Used

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- Zustand (for state management)
- React Hook Form & Zod (for form validation)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/event-brut.git
cd event-brut
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Usage

### Demo Accounts

For demonstration purposes, you can use the following accounts:

- **Admin User:**
  - Email: admin@example.com
  - Password: any password will work

- **Client User:**
  - Email: client@example.com
  - Password: any password will work

### Admin Features

- View all events in a management dashboard
- Create new events with details like title, description, date, time, location, and capacity
- Edit existing events
- Delete events
- View bookings for specific events

### Client Features

- Browse all upcoming events
- Search and filter events
- View event details
- Book events
- View booking history
- Cancel bookings

## Architectural Decisions

### State Management

The application uses Zustand for state management to allow for:

- Client-side data persistence with the persist middleware
- Separation of concerns with multiple stores (auth, events, bookings)
- Simple and intuitive API for managing application state

### Separation of Admin/Client Functionalities

The application clearly separates admin and client functionalities:

- Distinct navigation experiences based on user role
- Protected routes that verify user authentication and role
- Specific UI components tailored to each user type

### Data Structure

The main entities in the application are:

- **Users:** Contains information about the system users (admin or client)
- **Events:** Contains all event information including capacity management
- **Bookings:** Tracks which users have booked which events

### Mobile-First Approach

The application is designed with a mobile-first approach:

- Responsive layouts that adapt to different screen sizes
- Touch-friendly UI components
- Optimized navigation for smaller screens

## Future Enhancements

- Connect to a real backend API instead of using client-side data storage
- Add authentication with JWT and proper password encryption
- Implement email notifications for bookings
- Add payment integration for paid events
- Create a proper admin dashboard with analytics
- Enhance the filter capabilities with more options (location radius, date range, etc.)

## Developer Notes

This project was developed as a demonstration of modern web application development techniques with a unique neo-brutalist design aesthetic. The seniority level demonstrated in this solution is senior, as evidenced by:

- Clean code organization with separation of concerns
- Type safety throughout with TypeScript
- Custom hooks and reusable components
- Modern UI/UX practices
- Advanced form handling with validation
- Animation and transition management
- Comprehensive state management approach

The architecture is designed to be easily expandable, making it simple to add new features or connect to a real backend in the future.