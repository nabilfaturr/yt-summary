# Next.js Starter Template

A modern, feature-rich [Next.js](https://nextjs.org) starter project with authentication, database integration, and UI components.

## 📋 Project Overview

This project includes:

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Authentication** - Multi-provider auth support (OAuth)
- **Database** - Drizzle ORM with SQL migrations
- **UI Components** - Pre-built shadcn/ui components
- **Styling** - Tailwind CSS with PostCSS
- **Code Quality** - ESLint configuration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Package manager (npm, yarn, pnpm, or bun)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── core/            # Core utilities (database, schemas)
├── features/        # Feature modules (auth, etc.)
└── lib/             # Utility functions
```

## 🔐 Features

### Authentication

- Social authentication support
- Protected routes
- Session management with encrypted cookies

### Database

- Drizzle ORM for type-safe queries
- SQL migrations support
- Schema definitions in `src/core/db/schemas/`

### UI Components

- Pre-built button, card, input, and dropdown components
- Theme provider with dark/light mode toggle
- Responsive layout components

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run drizzle:generate` - Generate database migrations
- `npm run drizzle:migrate` - Run database migrations

## 📚 Learn More

For more information, check out these resources:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Drizzle ORM](https://orm.drizzle.team) - Database ORM documentation
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) - UI component library

## 🚢 Deployment

Deploy your application on [Vercel](https://vercel.com) for the best experience:

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Vercel automatically deploys your application

For detailed deployment instructions, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📝 License

This project is open source and available under the MIT License.
