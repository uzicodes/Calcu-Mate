# Calcu-mate

A comprehensive calculator web application built with Next.js and TypeScript. This application provides multiple types of calculators in a modern, responsive interface.

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

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with modern design principles
- **Routing**: Next.js App Router for client-side navigation
- **Build Tools**: Next.js built-in build system

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd calcu-mate
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
calcu-mate/
├── public/                # Static assets
├── server/                # Server-side code
├── src/                   # Source code
│   └── app/              # Next.js App Router
│       ├── calculator/   # Calculator pages
│       │   ├── basic/
│       │   ├── scientific/
│       │   ├── percentage/
│       │   ├── currency/
│       │   ├── unit/
│       │   ├── age/
│       │   ├── bmi/
│       │   └── loan/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
