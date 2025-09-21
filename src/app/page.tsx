import Link from "next/link";

interface Calculator {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export default function HomePage() {
  const calculators: Calculator[] = [
    {
      id: 'basic',
      name: 'Basic Calculator',
      description: 'Simple arithmetic operations',
      icon: '🔢'
    },
    {
      id: 'scientific',
      name: 'Scientific Calculator',
      description: 'Advanced mathematical functions',
      icon: '🧮'
    },
    {
      id: 'percentage',
      name: 'Percentage Calculator',
      description: 'Calculate percentages and ratios',
      icon: '📊'
    },
    {
      id: 'currency',
      name: 'Currency Calculator',
      description: 'Currency conversion and calculations',
      icon: '💰'
    },
    {
      id: 'unit',
      name: 'Unit Converter',
      description: 'Convert between different units',
      icon: '📏'
    },
    {
      id: 'age',
      name: 'Age Calculator',
      description: 'Calculate age and date differences',
      icon: '🎂'
    },
    {
      id: 'bmi',
      name: 'BMI Calculator',
      description: 'Body Mass Index calculator',
      icon: '⚖️'
    },
    {
      id: 'loan',
      name: 'Loan Calculator',
      description: 'Calculate loan payments and interest',
      icon: '🏦'
    },
    {
      id: 'base',
      name: 'Base Converter',
      description: 'Convert numbers between different bases',
      icon: '🔀'
    }
  ];

  return (
    <div className="min-h-screen bg-calc-gradient">
      {/* Navbar */}
      <nav className="border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <div className="flex items-center">
              <span className="text-2xl font-bold text-calc-gold">
                CALCU
                <span className="text-yellow-400">⚡</span>
                MATE
              </span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/uzicodes/Pro-Calc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-calc-gold hover:bg-calc-gold-light text-calc-dark font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              >
                GitHub
              </a>
              
              {/* Theme Toggle Button (placeholder for now) */}
              <button 
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200"
                title="Toggle theme"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Menu Toggle for Mobile */}
              <button 
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200 md:hidden"
                title="Menu"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-5 py-8 min-h-screen flex flex-col">
        <header className="text-center mb-10 text-white">
          <h1 className="text-5xl font-bold mb-2.5 drop-shadow-lg text-calc-gold">Calcu-Mate</h1>
          <p className="text-xl font-light opacity-90">Choose your calculator and start calculating!</p>
        </header>

        <main className="flex-1 flex justify-center items-center">
          <div className="calculator-grid">
            {calculators.map((calculator) => (
              <Link
                key={calculator.id}
                href={`/calculator/${calculator.id}`}
                className="calculator-card"
              >
                <div className="calculator-icon text-6xl">{calculator.icon}</div>
                <h3 className="font-semibold">{calculator.name}</h3>
                <p>{calculator.description}</p>
              </Link>
            ))}
          </div>
        </main>

        <footer className="text-center mt-10 text-calc-gold opacity-80 text-sm">
          <p>&copy; 2025 Calcu-Mate. © All rights Reserved </p>
        </footer>
      </div>
    </div>
  );
}
