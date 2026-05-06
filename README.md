<div align="center">

  <h1>Auto Saloon 🏎️</h1>

  <p>
    <a href="https://sonarcloud.io/summary/new_code?id=RickJurrasic_auto-saloon">
      <img src="https://sonarcloud.io/api/project_badges/measure?project=RickJurrasic_auto-saloon&metric=alert_status" alt="Quality Gate Status">
    </a>
    <a href="https://sonarcloud.io/summary/new_code?id=RickJurrasic_auto-saloon">
      <img src="https://sonarcloud.io/api/project_badges/measure?project=RickJurrasic_auto-saloon&metric=sqale_rating" alt="Maintainability Rating">
    </a>
    <a href="https://sonarcloud.io/summary/new_code?id=RickJurrasic_auto-saloon">
      <img src="https://sonarcloud.io/api/project_badges/measure?project=RickJurrasic_auto-saloon&metric=security_rating" alt="Security Rating">
    </a>
  </p>

  <p>
    <strong>A high-performance Full-stack Single Page Application (SPA) for luxury car retail.</strong><br />
    Engineered with a focus on clean architecture, security, and optimized SEO via Server-Side Rendering.
  </p>

  <a href="https://eriksternad.online"><strong>🌐 View Live Demo</strong></a>
</div>

<hr />

<h2>🚀 Project Overview</h2>

<p>
  Auto Saloon is a flagship demonstration project built on <strong>Laravel 12</strong>. It serves as a digital showroom for premium vehicles, combining the rapid interactivity of modern JavaScript frameworks with the robust security of a PHP backend.
</p>

<h3>Key Enhancements</h3>
<ul>
  <li><strong>Inertia.js & Vue 3:</strong> Fully refactored from traditional Blade templates to a modern SPA architecture.</li>
  <li><strong>Server-Side Rendering (SSR):</strong> Enabled for lightning-fast First Contentful Paint and flawless SEO indexing.</li>
  <li><strong>A/A/A Code Quality:</strong> Continuous analysis via SonarCloud, meeting the highest industry standards for maintainability and security.</li>
  <li><strong>Vite 7 Tooling:</strong> Utilizing the latest frontend build tools for optimized asset delivery.</li>
</ul>

<hr />

<div align="center">
  <h2>🛠️ Technology Stack</h2>
  <table width="100%">
    <tr>
      <td width="50%" align="center" valign="top">
        <h4>Backend 🧠</h4>
        <ul style="display: inline-block; text-align: left;">
          <li><b>Laravel 12</b> (PHP 8.2+)</li>
          <li>Inertia.js (Server-side adapter)</li>
          <li>SQLite (Default database)</li>
          <li>Ziggy (Type-safe routing)</li>
        </ul>
      </td>
      <td width="50%" align="center" valign="top">
        <h4>Frontend 🎨</h4>
        <ul style="display: inline-block; text-align: left;">
          <li><b>Vue 3</b> (Composition API)</li>
          <li>Tailwind CSS 4</li>
          <li>Vite 7</li>
          <li>Vue3-carousel</li>
        </ul>
      </td>
    </tr>
  </table>
</div>

<hr />

<h2>💻 Installation & Setup</h2>

<p>Follow these steps to get the project running locally:</p>

<ol>
  <li>
    <strong>Clone and Dependencies:</strong>
    <pre><code>git clone https://github.com/RickJurrasic/auto-saloon
cd auto-saloon
composer install
npm install</code></pre>
  </li>

  <li>
    <strong>Environment Configuration:</strong>
    <pre><code>cp .env.example .env
php artisan key:generate</code></pre>
    <p><i>Note: Update your .env file with your specific database and API credentials if necessary.</i></p>
  </li>

  <li>
    <strong>Database Migration:</strong>
    <pre><code>php artisan migrate --seed</code></pre>
  </li>

  <li>
  <strong>Build & Launch:</strong>
  <p>To run the application with SSR enabled, you need to build the assets and start both servers:</p>

  <pre><code># Terminal 1: Frontend Build
npm run build

# Terminal 2: PHP Development Server
php artisan serve

# Terminal 3: Inertia SSR Server
php artisan inertia:start-ssr</code></pre>
</li>
</ol>

<hr />

<h2>📊 Quality Metrics</h2>
<p>The project is continuously monitored for:</p>
<ul>
  <li><strong>Bugs & Vulnerabilities:</strong> 0 reported</li>
  <li><strong>Technical Debt:</strong> Minimal (Rating A)</li>
  <li><strong>Security Hotspots:</strong> 100% Clean</li>
</ul>

<hr />

<div align="center">
  <p>
    Licensed under the <a href="https://opensource.org/licenses/MIT">MIT License</a>
  </p>
</div>
