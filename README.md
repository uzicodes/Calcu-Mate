# Pro Calculator

A comprehensive calculator web application built with the MERN stack (MongoDB, Express, React, Node.js) using TypeScript. This application provides multiple types of calculators in a modern, responsive interface.

## Features

- **Basic Calculator**: Simple arithmetic operations
- **Scientific Calculator**: Advanced mathematical functions (sin, cos, tan, log, etc.)
- **Percentage Calculator**: Calculate percentages, increases, decreases
- **Currency Calculator**: Currency conversion with real-time rates
- **Unit Converter**: Convert between different units (length, weight, temperature, etc.)
- **Age Calculator**: Calculate age and date differences
- **BMI Calculator**: Body Mass Index calculator with health categories
- **Loan Calculator**: Calculate loan payments and interest

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Node.js with Express and TypeScript
- **Styling**: CSS3 with modern design principles
- **Routing**: React Router for client-side navigation
- **Build Tools**: Create React App for frontend, TypeScript compiler for backend

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pro-calc
```

2. Install dependencies for both frontend and backend:
```bash
npm run install:all
```

### Development

To run the application in development mode:

```bash
npm run dev
```

This will start both the React development server (port 3000) and the Express server (port 5000).

### Production

To build and run the application for production:

```bash
npm run build
npm start
```

## Project Structure

```
pro-calc/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── calculators/ # Calculator components
│   │   │   └── HomePage.tsx
│   │   ├── App.tsx        # Main App component
│   │   └── index.tsx      # React entry point
│   └── package.json
├── src/                   # Backend source
│   └── server.ts          # Express server
├── dist/                  # Compiled backend
├── package.json           # Root package.json
└── tsconfig.json         # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development servers
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run install:all` - Install all dependencies
- `npm run clean` - Clean build directories

## API Endpoints

- `POST /api/calculate` - Calculate expressions (for future API integration)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
