# 🧮 getcalculation

> Your go-to hub for precise and easy-to-use online calculators

A modern, SEO-optimized calculator platform built with Nuxt.js that provides instant access to mathematical and scientific calculators through a clean, searchable interface.

![Calculator Platform](https://img.shields.io/badge/Calculator-Platform-00A79D?style=for-the-badge&logo=calculator)
![Nuxt.js](https://img.shields.io/badge/Nuxt.js-4.0.3-00DC82?style=for-the-badge&logo=nuxt.js)
![Vue.js](https://img.shields.io/badge/Vue.js-3.5.20-4FC08D?style=for-the-badge&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

### 🔍 **Smart Search & Discovery**
- **Global Search**: Find any calculator instantly across all categories
- **Category Browsing**: Organized by Mathematics, Physics, and more
- **Live Search**: Real-time filtering as you type

### ⚡ **Live Calculations**
- **Instant Results**: Real-time calculations with smart debouncing
- **Form Validation**: Comprehensive error handling and input validation
- **Responsive Design**: Works perfectly on desktop and mobile

### 🚀 **SEO Optimized**
- **Dynamic Prerendering**: Pre-generated pages for common calculations
- **Parameterized URLs**: Shareable links with pre-filled values
- **Fast Loading**: Optimized performance and Core Web Vitals

### 🎨 **Modern UI/UX**
- **Clean Design**: Professional interface with teal accent colors
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Built with modern web standards



## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, pnpm, yarn, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/getcalculation.git
   cd getcalculation
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using pnpm
   pnpm install
   
   # Using yarn
   yarn install
   
   # Using bun
   bun install
   ```

3. **Start development server**
   ```bash
   # Using npm
   npm run dev
   
   # Using pnpm
   pnpm dev
   
   # Using yarn
   yarn dev
   
   # Using bun
   bun run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
getcalculation/
├── components/                 # Vue components
│   ├── CalculatorForm.vue     # Main calculator interface
│   └── ToolCard.vue          # Tool display cards
├── pages/                     # Nuxt.js pages
│   ├── index.vue             # Homepage with search
│   └── [category]/[tool]/[[slug]].vue  # Dynamic calculator pages
├── server/                    # Server-side code
│   ├── api/                  # API endpoints
│   │   ├── calculate/        # Calculation handlers
│   │   ├── manifests/        # Tool metadata APIs
│   │   └── tools/            # Tool listing APIs
│   └── assets/content/       # Tool definitions & datasets
│       ├── categories/       # Category metadata
│       ├── tools/            # Calculator manifests
│       └── datasets/         # CSV data for SEO
└── public/                   # Static assets
```

## 🔧 Development

### Adding New Calculators

1. **Create a tool manifest** in `server/assets/content/tools/{category}/{tool-name}.json`:
   ```json
   {
     "toolName": "Your Calculator",
     "toolSlug": "your-calculator",
     "categorySlug": "math",
     "description": "Description of your calculator",
     "calculationLogic": "YOUR_LOGIC",
     "parameters": [
       { "name": "input1", "label": "Input 1", "type": "number", "unit": "units" }
     ],
     "outputs": [
       { "name": "result", "label": "Result", "type": "number", "precision": 2, "unit": "units" }
     ],
     "pSEODataset": "/datasets/math/your-calculator-data.csv"
   }
   ```

2. **Add calculation logic** in `server/api/calculate/[category]/[tool].post.js`:
   ```javascript
   const calculationLibrary = new Map([
     // ... existing calculators
     [
       'YOUR_LOGIC',
       ({ input1 }) => {
         const result = /* your calculation */;
         return { result };
       }
     ]
   ]);
   ```

3. **Create SEO dataset** (optional) in `server/assets/content/datasets/{category}/{tool-name}-data.csv`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
```

## 🎨 Design System

### Color Palette
- **Primary Background**: Deep Navy Blue (#1B2A41)
- **Accent Color**: Professional Teal (#00A79D)
- **Secondary Accents**: Category-specific colors

### Typography
- **Font Family**: Plus Jakarta Sans
- **Headings**: Clean, modern sans-serif with technical feel
- **Body Text**: Regular weight for maximum legibility

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Minimal JavaScript footprint
- **SEO**: Dynamic prerendering for maximum discoverability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-calculator`)
3. Commit your changes (`git commit -m 'Add amazing calculator'`)
4. Push to the branch (`git push origin feature/amazing-calculator`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Nuxt.js](https://nuxt.com/)
- Powered by [Vue.js](https://vuejs.org/)
- CSV parsing by [PapaParse](https://www.papaparse.com/)

---

<div align="center">
  <strong>Made with ❤️ for the calculation community</strong>
</div>
