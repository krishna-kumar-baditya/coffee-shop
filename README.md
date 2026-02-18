# Brew & Co. (Coffee Shop Frontend)

A full React-based coffee shop frontend with two authentication flows (admin + customer), product catalog management, and cart experience.

## What I Built

This project is a role-aware e-commerce frontend for a coffee brand:

- Public storefront with landing page, products listing, product detail, about, and contact pages.
- Customer authentication (sign up/sign in), cart management, and checkout-ready cart summary flow.
- Admin authentication and protected dashboard for product CRUD operations.
- Shared API client layer and centralized state management with Redux Toolkit.

## Core Features

### 1) Public Storefront
- Home page with reusable sections (`Slider`, `Featured`, `MenuFeatured`, `Testimonials`, `Gallery`).
- Product listing page that loads data from backend API.
- Product detail page with pricing, discount display, and add-to-cart action.

### 2) Authentication
- Separate auth entry points for:
  - Admin: `/signin`, `/signup`
  - Customer: `/user/signin`, `/user/signup`
- Token persistence in `localStorage`.
- Route guard for admin dashboard routes using a `PrivateRoute` wrapper.

### 3) Cart System
- Add/increment/decrement/remove/clear cart items.
- Cart persisted in `localStorage` (`userCart`) so refresh does not lose state.
- Cart page gated for signed-in users (customer or admin token state check).

### 4) Admin Dashboard
- Dashboard layout with sidebar + header.
- Product creation form with file validation (type + size), metadata fields, and API submission.
- Product list view with actions (edit/delete).
- Product edit form with image preview + update flow.
- Profile page fed from backend profile endpoint.

## Tech Stack

- React 19 + Vite
- React Router
- Redux Toolkit + React Redux
- React Hook Form
- Axios (with request interceptor)
- Tailwind CSS v4
- MUI (AppBar/Menu/Icon components)
- React Hot Toast

## Architecture Notes

- API configuration: `src/Api/endpoint.jsx`
  - Base URL currently points to Render backend:
    - `https://coffee-api-g8s7.onrender.com/api/`
- Axios instance: `src/Api/axiosInstance.jsx`
  - Attaches `userToken` or fallback `token` in request headers.
- Global store: `src/Redux/Store.js`
  - `authKey`, `userAuthKey`, `prodKey`, `cartKey`, `userKey`
- Routing: `src/Routing/Routing.jsx`
  - Lazy-loaded pages + protected admin routes.

## Main User Flows

1. Customer signs up/signs in.
2. Customer browses products and opens product detail.
3. Customer adds product to cart and updates quantity.
4. Admin signs in and accesses dashboard.
5. Admin creates/edits/deletes products.

## Run Locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Folder Snapshot

```text
src/
  Api/                # Base URL + endpoints + axios client
  Routing/            # Route map + private route logic
  Redux/              # Store + slices (auth, userAuth, product, cart, profile)
  page/               # Screens (auth, products, cart, dashboard pages)
  Components/         # Reusable UI components
  Layout/             # Header / Footer
  Context/            # Sidebar UI state
```

## Known Gaps / Improvements

- Some product UI paths use mixed field names (`name` vs `title`, `discountPrice` vs `discountPercent`) and should be normalized end-to-end.
- Forgot-password page is currently UI-first and not wired to backend API call yet.
- API base URL is hardcoded; should be moved to environment variables for deployment flexibility.
- Automated tests are not added yet (unit/integration/e2e).

## Why This Project Is Interview-Relevant

This codebase demonstrates:

- Building a production-style React app with role-based flows.
- State architecture with Redux Toolkit thunks for async API interactions.
- Form-heavy implementation with validation and file upload handling.
- Practical e-commerce primitives: catalog, product detail, and persistent cart.
- Componentized frontend structure with protected routing and reusable layout patterns.
