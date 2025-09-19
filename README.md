# 🧮 Calcu-Mate

> A comprehensive calculator web application with multiple calculator types

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🌟 Features

Calcu-Mate is a modern, responsive web application that provides 8 different types of calculators to meet all your calculation needs:

### 🔢 Available Calculators

| Calculator | Description | Icon |
|------------|-------------|------|
| **Basic Calculator** | Simple arithmetic operations (addition, subtraction, multiplication, division) | 🔢 |
| **Scientific Calculator** | Advanced mathematical functions (trigonometry, logarithms, powers, etc.) | 🧮 |
| **Percentage Calculator** | Calculate percentages, percentage increase/decrease, and ratios | 📊 |
| **Currency Calculator** | Currency conversion and exchange rate calculations | 💰 |
| **Unit Converter** | Convert between different units (length, weight, temperature, etc.) | 📏 |
| **Age Calculator** | Calculate age, date differences, and time intervals | 🎂 |
| **BMI Calculator** | Body Mass Index calculator with health categorization | ⚖️ |
| **Loan Calculator** | Calculate loan payments, interest rates, and amortization schedules | 🏦 |

## 🚀 Demo

Visit the live demo: [Calcu-Mate Live](https://your-deployment-url.vercel.app)

## 📸 Screenshots

### Home Page

![Home Page](./public/screenshot-home.png)

### Calculator Interface

![Calculator Interface](./public/screenshot-calculator.png)

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.3 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Next.js built-in bundler
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm/yarn

## 📦 Installation

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Clone the Repository

```bash
git clone https://github.com/uzicodes/Pro-Calc.git
cd Calcu-Mate
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```text
Calcu-Mate/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── logo.png
│   └── ...
├── src/
│   └── app/               # Next.js App Router
│       ├── globals.css    # Global styles
│       ├── layout.tsx     # Root layout
│       ├── page.tsx       # Home page
│       └── calculator/    # Calculator routes
│           ├── age/
│           ├── basic/
│           ├── bmi/
│           ├── currency/
│           ├── loan/
│           ├── percentage/
│           ├── scientific/
│           └── unit/
├── server/                # Server configuration
├── package.json
├── next.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Design Features

- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Theme**: Beautiful gradient background with gold accents
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Performance**: Optimized with Next.js for fast loading times

## 📱 Usage

1. **Navigate to Home Page**: See all available calculators
2. **Select Calculator**: Click on any calculator card to access it
3. **Perform Calculations**: Use the calculator interface for your calculations
4. **Navigate Back**: Use the back button to return to the home page

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory for any environment-specific configurations:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### Customization

- **Colors**: Modify the Tailwind configuration in `tailwind.config.js`
- **Styles**: Update global styles in `src/app/globals.css`
- **Calculators**: Add new calculators by creating new folders in `src/app/calculator/`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] Add more calculator types (Investment, Tax, etc.)
- [ ] Implement calculation history
- [ ] Add dark/light theme toggle
- [ ] Include unit tests
- [ ] Add Progressive Web App (PWA) features
- [ ] Implement sharing functionality
- [ ] Add keyboard shortcuts

## 🐛 Bug Reports

If you find a bug, please open an issue on GitHub with:

- A clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created by uzicodes

- GitHub: [@uzicodes](https://github.com/uzicodes)
- Repository: [Pro-Calc](https://github.com/uzicodes/Pro-Calc)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from Unicode Emoji
- Inspired by modern calculator applications

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/uzicodes/Pro-Calc?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/uzicodes/Pro-Calc?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/uzicodes/Pro-Calc?style=flat-square)

---

Made with ❤️ for the developer community
