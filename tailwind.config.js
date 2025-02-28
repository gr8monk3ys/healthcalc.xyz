/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f0f2f5", // Light gray background for neumorphic design
        secondary: "#e0e5ec", // Slightly darker for shadows
        accent: {
          DEFAULT: "#4f46e5", // Indigo accent color
          light: "#6366f1",
          dark: "#4338ca",
        },
        success: "#10b981", // Green
        warning: "#f59e0b", // Amber
        danger: "#ef4444",  // Red
        info: "#3b82f6",    // Blue
      },
      boxShadow: {
        'neumorph': '8px 8px 16px rgba(174, 174, 192, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.8)',
        'neumorph-inset': 'inset 4px 4px 8px rgba(174, 174, 192, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.8)',
        'neumorph-flat': '3px 3px 6px rgba(174, 174, 192, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.8)',
        'neumorph-pressed': 'inset 2px 2px 5px rgba(174, 174, 192, 0.4), inset -2px -2px 5px rgba(255, 255, 255, 0.8)',
      },
      borderRadius: {
        'neumorph': '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in-up': 'slideInUp 0.5s ease-out',
        'pulse': 'pulse 2s infinite ease-in-out',
        'bounce': 'bounce 2s infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        bounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)',
      },
      backgroundSize: {
        '200': '200% 100%',
      },
    },
  },
  plugins: [],
}
