import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

interface MenuItem {
  name: string;
  path: string;
  description: string;
}

const menuItems: MenuItem[] = [
  { 
    name: 'Home', 
    path: '/', 
    description: 'Dashboard of all calculators' 
  },
  { 
    name: 'Body Fat Calculator', 
    path: '/body-fat', 
    description: 'Calculate your body fat percentage using various methods' 
  },
  { 
    name: 'Calorie Deficit Calculator', 
    path: '/calorie-deficit', 
    description: 'Discover how long to reach your goal weight' 
  },
  { 
    name: 'Weight Management Calculator', 
    path: '/weight-management', 
    description: 'Plan your weight loss with a target date' 
  },
  { 
    name: 'Maximum Fat Loss Calculator', 
    path: '/maximum-fat-loss', 
    description: 'Find optimal calorie intake for maximum fat loss' 
  },
  { 
    name: 'TDEE Calculator', 
    path: '/tdee', 
    description: 'Calculate your Total Daily Energy Expenditure' 
  },
  { 
    name: 'ABSI Calculator', 
    path: '/absi', 
    description: 'Calculate your A Body Shape Index' 
  },
  { 
    name: 'Calorie Burn Calculator', 
    path: '/calorie-burn', 
    description: 'Estimate calories burned through physical activities' 
  },
  { 
    name: 'BMI Calculator', 
    path: '/bmi', 
    description: 'Calculate Body Mass Index for adults and children' 
  },
  { 
    name: 'Waist-to-Hip Ratio', 
    path: '/whr', 
    description: 'Calculate your Waist-to-Hip Ratio' 
  },
  { 
    name: 'Measurement Conversions', 
    path: '/conversions', 
    description: 'Convert between different units of measurement' 
  },
];

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-accent">
            HealthCheck
          </Link>
          
          <button 
            onClick={toggleMenu} 
            className="neumorph-btn flex items-center gap-2"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span>Menu</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}>
          <div 
            className="fixed right-0 top-0 h-full w-80 bg-primary shadow-lg z-50 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Calculators</h2>
              <button 
                onClick={toggleMenu}
                className="neumorph-btn p-2"
                aria-label="Close menu"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      href={item.path}
                      className={`block p-3 rounded-lg transition-all ${
                        router.pathname === item.path 
                          ? 'neumorph-inset text-accent' 
                          : 'neumorph hover:shadow-neumorph-inset'
                      }`}
                      onClick={toggleMenu}
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-primary p-6 border-t border-gray-200">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold text-accent">
                HealthCheck
              </Link>
              <p className="text-sm mt-1">Your go-to resource for health and fitness calculators</p>
            </div>
            
            <div className="flex gap-6">
              <Link href="/about" className="text-sm hover:text-accent">
                About Us
              </Link>
              <Link href="/privacy" className="text-sm hover:text-accent">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-sm hover:text-accent">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} HealthCheck. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
