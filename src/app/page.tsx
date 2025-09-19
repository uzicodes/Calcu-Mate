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
    <div className="min-h-screen bg-calc-gradient">
      <div className="container mx-auto px-5 py-8 min-h-screen flex flex-col">
        <header className="text-center mb-10 text-white">
          <h1 className="text-5xl font-bold mb-2.5 drop-shadow-lg text-calc-gold">Calcu-mate</h1>
          <p className="text-xl font-light opacity-90">Choose your calculator type</p>
        </header>

        <main className="flex-1 flex justify-center items-center">
          <div className="calculator-grid">
            {calculators.map((calculator) => (
              <Link
                key={calculator.id}
                href={`/calculator/${calculator.id}`}
                className="calculator-card hover:border-calc-gold hover:shadow-calc-gold/20"
              >
                <div className="calculator-icon text-6xl">{calculator.icon}</div>
                <h3 className="text-calc-dark font-semibold">{calculator.name}</h3>
                <p className="text-gray-600">{calculator.description}</p>
              </Link>
            ))}
          </div>
        </main>

        <footer className="text-center mt-10 text-calc-gold opacity-80 text-sm">
          <p>&copy; 2024 Calcu-mate. Built with Next.js & TypeScript</p>
        </footer>
      </div>
    </div>
  );
}
