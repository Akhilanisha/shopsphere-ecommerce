# ShopSphere — Angular Frontend

A responsive product catalogue frontend for the existing `01_products_api` Spring Boot REST API.

## Features

- Product cards using the API's name/title, description, price, and image URL fields
- Product name search
- Category filter
- Product details modal
- Stock and active/unavailable status display
- Loading, empty, and API-error states
- Responsive layout for desktop, tablet, and mobile

## Requirements

- Node.js 20.19+ (recommended for Angular 18)
- npm
- The Spring Boot backend running on `http://localhost:8080`
- The backend's configured MySQL database reachable and populated

## Run the frontend

Open a terminal in this folder and run:

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

The Angular development server uses `proxy.conf.json` to forward `/api/...` requests to `http://localhost:8080`. Keep the backend running in a second terminal. The proxy is for local development, not a production reverse proxy.

## Run the backend

In a separate terminal, open the existing Spring Boot project folder and run:

```bash
./mvnw spring-boot:run
```

If the Maven wrapper does not work and Maven is installed, use:

```bash
mvn spring-boot:run
```

The backend currently uses database settings from its own `application.properties`. Confirm the database is reachable before starting it. Do not commit database passwords or other secrets to Git.

## API endpoints used

- `GET /api/products`
- `GET /api/product-category`
- `GET /api/products/search/findByNameContaining?name=laptop`
- `GET /api/products/search/findByCategoryId?id=1`

These are based on the Spring Data REST repository configuration in the backend. If a repository search endpoint differs at runtime, check the backend response at `http://localhost:8080/api` and adjust `src/app/services/product.service.ts`.

## Important notes

- This is a catalogue frontend, not a complete checkout system. It does not yet include login, a cart, order placement, payments, or admin product management.
- Product prices are displayed in AED as a UI default. Change the currency pipe in `src/app/app.component.html` if the database uses another currency.
- The product images depend on valid public image URLs in the database; missing/broken URLs use a placeholder.
- This starter is configured for Angular 18. After `npm install`, you can check dependency compatibility with `npm ls`.
