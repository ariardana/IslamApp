# GEMINI.md - IslamApp

## Project Overview

This project is a modern digital Islamic platform called IslamApp. It is a web application built with React, Vite, TypeScript, and Tailwind CSS. The app provides a comprehensive set of features for the Muslim community, including a digital Qur'an, prayer times, an Islamic calendar, and Islamic news.

The application is designed to be a Progressive Web App (PWA), allowing for offline access and installation on the home screen of a device. It features a dark/light theme and is localized for the Indonesian Muslim community.

**Key Technologies:**

*   **Frontend:** React, Vite, TypeScript, Tailwind CSS
*   **State Management:** Zustand for global state, @tanstack/react-query for API state
*   **Routing:** React Router
*   **HTTP Client:** Axios
*   **UI:** Lucide React for icons, react-hot-toast for notifications
*   **Linting:** ESLint
*   **Package Manager:** npm

**Architecture:**

The application follows a component-based architecture with a clear separation of concerns. It uses custom hooks for business logic, services for API interactions, and a Zustand store for global state management. The project structure is well-organized, with components, hooks, services, and types all in their own dedicated directories.

## Building and Running

### Prerequisites

*   Node.js (v18.0.0 or newer)
*   npm (v8.0.0 or newer)

### Development

To run the application in a development environment:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

### Production

To build the application for production:

1.  **Build the project:**
    ```bash
    npm run build
    ```

The production-ready files will be located in the `dist` directory.

2.  **Preview the production build:**
    ```bash
    npm run preview
    ```

### Linting

To run the linter:

```bash
npm run lint
```

## Development Conventions

*   **Coding Style:** The project uses ESLint and Prettier (inferred from the presence of `eslint.config.js` and the `lint` script) to enforce a consistent coding style.
*   **State Management:** Global application state is managed with Zustand, while API data is managed with React Query.
*   **Component Structure:** Components are organized by feature under the `src/components` directory.
*   **API Interaction:** API calls are centralized in the `src/services` directory.
*   **Type Safety:** TypeScript is used throughout the project to ensure type safety.
*   **Styling:** Tailwind CSS is used for styling.
*   **Git:** The project is under version control with Git.
