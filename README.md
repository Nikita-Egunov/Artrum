# Artrum

Artrum is a unique platform where you can request and receive digital art pieces. The platform features a collection of available arts that you can request, and a section for rare arts. The project is built using modern web technologies and follows best practices for code organization and maintainability.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Request digital art pieces
- Browse available and rare arts
- User authentication and profile management
- Responsive design with a clean and modern UI

## Technologies

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit
- **Authentication**: JWT, Argon2 for password hashing
- **Database**: Prisma, SQLite (or other supported databases)
- **Testing**: Jest, React Testing Library
- **Linting and Formatting**: ESLint, Prettier
- **Build Tool**: Next.js with Turbopack

## Getting Started

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (v18 or later)
- npm (v8 or later) or yarn (v1.22 or later)
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Nikita-Egunov/Artrum.git
cd Artrum
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
```

3. Set up the database:

```bash
npx prisma migrate deploy
```

### Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

The project follows a feature-based folder structure with clear separation of concerns:

- `src/app/`: Next.js pages and layout
- `src/features/`: Feature-specific components and logic
- `src/widgets/`: Reusable UI components
- `src/shared/`: Shared utilities, components, and configuration
- `src/utils/`: Helper functions and hooks
- `src/processes/`: Business logic and processes
- `prisma/`: Database schema and migrations

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to contribute to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please open an issue on the [GitHub repository](https://github.com/Nikita-Egunov/Artrum).

---

Demo: [https://artrum.vercel.app/](https://artrum.vercel.app/)
