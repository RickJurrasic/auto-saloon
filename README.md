# Auto Saloon

## Project Description

Auto Saloon is a modern web application for showcasing luxury cars, allowing users to browse a showroom, view car details, and potentially book test rides. The project has been recently refactored to leverage a cutting-edge technology stack, focusing on a seamless user experience and efficient development.

## Features

*   **Luxury Car Showroom:** Browse a curated collection of high-end vehicles.
*   **Detailed Car Views:** Access comprehensive information and images for each car.
*   **User Authentication:** Secure login functionality.
*   **Admin Dashboard:** (Implied by `Admin/DashboardController.php`) Management interface for administrators.
*   **Responsive Design:** (Implied by Tailwind CSS) Optimized for various screen sizes.

## Technology Stack

The project is built with a modern and robust set of technologies:

*   **Backend:**
    *   **Laravel (v12):** A powerful PHP framework for rapid web application development.
    *   **PHP (v8.2+):** The core scripting language.
    *   **Inertia.js (Laravel Adapter):** Connects the Laravel backend with the Vue.js frontend, enabling a monolithic development experience for Single Page Applications (SPAs).
*   **Frontend:**
    *   **Vue.js (v3):** A progressive JavaScript framework for building user interfaces.
    *   **Vite (v7):** A next-generation frontend tooling that provides an extremely fast development server and optimized build process.
    *   **Tailwind CSS (v4):** A utility-first CSS framework for rapidly building custom designs.
    *   **vue3-carousel:** A Vue.js component for carousels.
*   **Database:**
    *   **SQLite:** (Implied by `database.sqlite`) Lightweight, file-based database for development.

## Key Architectural Decisions & Improvements

*   **Inertia.js Refactoring:** The project underwent a significant refactoring from traditional Blade views to a modern Single Page Application (SPA) architecture using Inertia.js. This provides a more dynamic and responsive user experience while retaining the benefits of server-side routing and controllers.
*   **Server-Side Rendering (SSR):** Implemented SSR to enhance SEO, improve initial page load performance, and provide a better user experience, especially on slower networks or devices. This ensures that the initial HTML served to the client is fully rendered, even before JavaScript loads.
*   **Vite for Frontend Tooling:** Utilizes Vite for its lightning-fast hot module replacement (HMR) and optimized production builds, significantly improving developer productivity.
*   **Component-Based UI:** The frontend is built with reusable Vue components, promoting modularity and maintainability.

## Installation

To set up and run the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/RickJurrasic/auto-saloon
    cd auto-saloon
    ```

2.  **Install PHP Dependencies:**
    ```bash
    composer install
    ```

3.  **Install JavaScript Dependencies:**
    ```bash
    npm install
    ```

4.  **Copy Environment File:**
    ```bash
    cp .env.example .env
    ```

5.  **Generate Application Key:**
    ```bash
    php artisan key:generate
    ```

6.  **Configure Database:**
    *   Ensure your `.env` file is configured for your database (e.g., SQLite is pre-configured with `database/database.sqlite`).

7.  **Run Migrations and Seeders:**
    ```bash
    php artisan migrate --seed
    ```

8.  **Build Frontend Assets:**
    ```bash
    npm run build
    ```

9.  **Start Laravel Development Server:**
    ```bash
    php artisan serve
    ```

10. **Start Inertia SSR Server (in a separate terminal):**
    ```bash
    php artisan inertia:start-ssr
    ```

    Your application should now be accessible at `http://127.0.0.1:8000`.

## Usage

*   Navigate to `http://127.0.0.1:8000` in your web browser.
*   Explore the showroom, view car details, and interact with the application.
*   To verify SSR, view the page source (Ctrl+U) or disable JavaScript in your browser.

## Contributing

Contributions are welcome! Please feel free to fork the repository, make your changes, and submit a pull request.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
