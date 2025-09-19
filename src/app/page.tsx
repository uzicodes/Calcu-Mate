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
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-5 py-8 min-h-screen flex flex-col">
        <header className="text-center mb-10 text-white">
          <h1 className="text-5xl font-bold mb-2.5 drop-shadow-lg">Calc-mate</h1>
          <p className="text-xl font-light opacity-90">Choose your calculator type</p>
        </header>

        <main className="flex-1 flex justify-center items-center">
          <div className="calculator-grid">
            {calculators.map((calculator) => (
              <Link
                key={calculator.id}
                href={`/calculator/${calculator.id}`}
                className="calculator-card"
              >
                <div className="calculator-icon">{calculator.icon}</div>
                <h3>{calculator.name}</h3>
                <p>{calculator.description}</p>
              </Link>
            ))}
          </div>
        </main>

        <footer className="text-center mt-10 text-white opacity-80 text-sm">
          <p>&copy; 2024 Calc-mate. Built with Next.js & TypeScript</p>
        </footer>
      </div>
    </div>
  );
}
