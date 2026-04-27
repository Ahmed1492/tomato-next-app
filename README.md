# 🍔 Food Flow

A full-stack food delivery web application built entirely with **Next.js 15 App Router**. Browse menus, search dishes, manage a cart, save favorites, place orders, and track delivery history — all in one seamless experience with a built-in backend via Next.js API routes.

**🚀 Live Demo:** [https://tomato-next-app.vercel.app](https://tomato-next-app.vercel.app)

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, SSR + Client Components) |
| Styling | Tailwind CSS + custom CSS animations |
| Database | MongoDB Atlas via Mongoose |
| Authentication | JWT (jsonwebtoken) + bcrypt |
| Image Storage | Cloudinary |
| HTTP Client | Axios |
| Notifications | React Toastify |
| Payments | Cash on Delivery (built-in) · Stripe (optional) |

---

## 📁 Project Structure

```
food-flow/
├── src/
│   ├── app/                          # Next.js App Router pages + API routes
│   │   ├── api/                      # ── Backend (Next.js Route Handlers) ──
│   │   │   ├── auth/
│   │   │   │   ├── login/            # POST  — email/password login → JWT
│   │   │   │   ├── register/         # POST  — create account (bcrypt password)
│   │   │   │   ├── user-data/        # GET   — fetch logged-in user profile
│   │   │   │   ├── add-image/        # POST  — upload profile photo (Cloudinary)
│   │   │   │   └── remove-image/     # DELETE — delete profile photo
│   │   │   ├── cart/
│   │   │   │   ├── add/              # POST  — add item / increment quantity
│   │   │   │   ├── remove/           # PUT   — decrement / remove item
│   │   │   │   └── get/              # GET   — fetch user's cart object
│   │   │   ├── favorites/
│   │   │   │   ├── add/              # POST  — add food ID to favorites array
│   │   │   │   ├── remove/           # DELETE — remove food ID from favorites
│   │   │   │   └── get/              # GET   — fetch user's favorites list
│   │   │   ├── food/
│   │   │   │   ├── add/              # POST  — add food item with image (admin)
│   │   │   │   ├── get/              # GET   — list all food items
│   │   │   │   └── remove/           # DELETE — remove food item (admin)
│   │   │   ├── order/
│   │   │   │   ├── place/            # POST  — place order (COD or Stripe)
│   │   │   │   ├── verify/           # POST  — confirm payment & update status
│   │   │   │   ├── history/          # GET   — paginated history + stats
│   │   │   │   ├── user-orders/      # GET   — paginated orders (legacy)
│   │   │   │   ├── orders/           # GET   — all orders (admin)
│   │   │   │   └── update-status/    # PUT   — update order status (admin)
│   │   │   └── seed/                 # GET   — seed food data (dev only)
│   │   │
│   │   ├── about/                    # About page (story, values, team, timeline)
│   │   ├── cart/                     # Cart page with promo codes
│   │   ├── contact/                  # Contact page with FAQ accordion
│   │   ├── my-orders/                # Full order history page
│   │   ├── order/                    # Checkout / place order page
│   │   ├── profile/                  # Profile page (info, orders, favorites)
│   │   ├── search/                   # Search page with filters + pagination
│   │   ├── verify/                   # Order confirmation / payment result page
│   │   ├── HomeClient.jsx            # Client wrapper for home page
│   │   ├── page.jsx                  # Home page (SSR, revalidates every 60s)
│   │   ├── layout.jsx                # Root layout (providers, toasts, loaders)
│   │   ├── loading.jsx               # Home page skeleton (instant display)
│   │   └── globals.css               # Global styles, animations, design tokens
│   │
│   ├── components/
│   │   ├── Navbar.jsx                # Sticky navbar, scroll effect, profile dropdown
│   │   ├── Footer.jsx                # Site footer with links
│   │   ├── LoginPop.jsx              # Auth modal (login + register, validation)
│   │   ├── Header.jsx                # Hero section with CTA
│   │   ├── Features.jsx              # Features highlight section
│   │   ├── ExploreMenu.jsx           # Category filter strip
│   │   ├── ClientFoodDisplay.jsx     # Food grid with pagination (client)
│   │   ├── FoodDisplay.jsx           # Food grid with pagination (SSR fallback)
│   │   ├── ServerFoodDisplay.jsx     # Server-side food fetcher
│   │   ├── Food_Item.jsx             # Food card (heart, quick-view, cart controls)
│   │   ├── ProductPopup.jsx          # Product detail modal (3 tabs + reviews)
│   │   ├── OrderHistoryPanel.jsx     # Reusable order history (stats, cards, reorder)
│   │   ├── Avatar.jsx                # Initials avatar with gradient (no-photo fallback)
│   │   ├── SearchBar.jsx             # Search modal with suggestions + recent searches
│   │   ├── Testimonials.jsx          # Auto-rotating customer reviews
│   │   ├── MobileApp.jsx             # App download section
│   │   ├── PageLoader.jsx            # Top progress bar on route change
│   │   ├── ScrollToTop.jsx           # Auto scroll-to-top on navigation
│   │   ├── SkeletonCard.jsx          # Shimmer food card skeleton
│   │   └── skeletons/
│   │       ├── PageSkeleton.jsx      # Full-page skeletons (7 page types)
│   │       └── OrderRowSkeleton.jsx  # Order row shimmer skeleton
│   │
│   ├── context/
│   │   └── StoreContext.jsx          # Global state: cart, auth, favorites, food data
│   │
│   ├── models/
│   │   ├── User.js                   # User schema
│   │   ├── Food.js                   # Food item schema
│   │   └── Order.js                  # Order schema
│   │
│   └── lib/
│       ├── auth.js                   # JWT helpers + authMiddleware
│       ├── db.js                     # MongoDB connection (cached singleton)
│       ├── cloudinary.js             # Cloudinary config
│       └── seed.js                   # Seed data helper
│
├── public/                           # Static assets (images, icons, food photos)
├── .env.local                        # Environment variables (see below)
├── next.config.mjs                   # Next.js config (image domains)
├── tailwind.config.js                # Tailwind config
└── package.json
```

---

## ⚙️ Environment Variables

Create `.env.local` in the `food-flow/` directory:

```env
# MongoDB Atlas connection string
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/food-flow

# JWT secret — any long random string
JWT_SECRET=your_super_secret_key_here

# Cloudinary (for profile photo uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe (optional — leave blank to use Cash on Delivery only)
STRIPE_SECRET_KEY=sk_test_51...

# Leave blank — app auto-detects its own origin
NEXT_PUBLIC_BACKEND_URL=
NEXT_PUBLIC_FRONTEND_URL=
```

> **Note:** `NEXT_PUBLIC_BACKEND_URL` is intentionally empty. All API calls use relative URLs (`/api/...`) so they always hit the correct port regardless of where Next.js starts.

---

## 🏃 Getting Started

```bash
# 1. Install dependencies
cd food-flow
npm install

# 2. Create .env.local with your credentials (see above)

# 3. Start development server
npm run dev
```

App runs at **http://localhost:3000** (or next available port if 3000 is taken).

To seed the database with sample food items, visit:
```
http://localhost:3000/api/seed
```

---

## 🚀 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ahmed1492/tomato-next-app)

### Manual Deployment

1. **Push your code to GitHub** (already done ✅)

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository: `Ahmed1492/tomato-next-app`

3. **Configure Environment Variables:**
   Add these in Vercel dashboard (Settings → Environment Variables):
   ```
   MONGODB_URL=mongodb+srv://ahmed:01148623288@cluster0.rhuzw8c.mongodb.net/food-flow
   JWT_SECRET=ahmed123
   CLOUDINARY_CLOUD_NAME=ahmed149
   CLOUDINARY_API_KEY=339875159134747
   CLOUDINARY_API_SECRET=AIJzZTeMDck4Wj_RGfJT2Dsmnxc
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app
   - Your app will be live at `https://your-project.vercel.app`

5. **Seed the database:**
   Visit `https://your-project.vercel.app/api/seed` to populate food items

### Build Configuration
- Framework: Next.js
- Build Command: `next build` (auto-detected)
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install` (auto-detected)
- ESLint & TypeScript errors are ignored during build

---

## ✨ Features

### 🏠 Home Page
- Server-side rendered food grid (revalidates every 60s)
- Hero section with animated CTA
- Category filter strip (Salad, Rolls, Burgers, Pasta, etc.)
- Food grid with **8-per-page pagination**
- Features section, auto-rotating testimonials, mobile app download section

### 🔍 Search Page (`/search`)
- Real-time search across name, description, and category
- Category dropdown, price range slider, sort by name/price
- **Paginated results** (8 per page) with ellipsis navigation
- Resets to page 1 on any filter change

### 🪟 Product Popup
- Opens on any food card click (home + search)
- **Details tab** — description, prep time, calories, servings, rating
- **Ingredients tab** — key ingredients per food category
- **Reviews tab** — star rating breakdown + 3 user reviews
- Heart/favorite toggle button
- Sticky add-to-cart footer with live quantity counter + total price
- Closes on backdrop click or `Escape` key

### 🛒 Cart Page (`/cart`)
- Item quantity controls (add/remove)
- Promo code support (`SAVE10` = 10% off, `FREE5` = $5 off)
- Order summary with delivery fee
- Redirects to checkout

### 📦 Checkout Page (`/order`)
- Delivery address form (auto-prefills from user profile)
- Payment method selector: **Cash on Delivery** or **Stripe** (if configured)
- Order progress stepper (Cart → Delivery → Payment)
- Itemized order summary with food images
- Trust badges (Secure / Fast / Refundable)

### ✅ Order Confirmation (`/verify`)
- Animated success screen with order ID
- 3-step status preview
- "Track Order" and "Back to Home" buttons
- Failure screen with "Back to Cart" option

### 📋 My Orders (`/my-orders`)
- Stats cards: Total Orders, Total Spent, Delivered, In Progress
- "Most Ordered" item highlight
- Filter by status: All / Processing / Out for Delivery / Delivered / Cancelled
- Each order card: status icon, date/time, item image stack, payment badge
- Expand → delivery address, itemized breakdown, 4-step visual timeline
- **Reorder button** — adds all items back to cart instantly
- Paginated with numbered pages

### 👤 Profile Page (`/profile`)
- **Profile Info tab** — view/edit name, upload/remove photo
- **Order History tab** — compact 3-order preview with "View All" link
- **Favorites tab** — saved dishes with add-to-cart and remove buttons
- **Quick Actions tab** — shortcuts to orders, cart, search
- Banner with member stats (favorites count, join date)

### ❤️ Favorites System
- Heart button on every food card and product popup
- Persisted to MongoDB per user via `/api/favorites/*`
- Optimistic UI update (instant toggle, syncs in background)
- Prompts sign-in if not logged in

### 🔐 Authentication
- JWT-based login/register
- Passwords hashed with bcrypt
- Token stored in `localStorage`, read on mount
- Profile photo upload/delete via Cloudinary
- Hydration-safe: no flash of "Please Sign In" on page load

### 🎨 UI / UX
- **Page transition progress bar** (top of screen, like YouTube)
- **Scroll-to-top** on every route change
- **Skeleton loading** for every page (7 page-specific layouts)
- **Avatar component** — generates colored initials avatar when no photo uploaded
- Responsive: mobile-first, 1→2→3→4 column grids
- Smooth animations: `fadeIn`, `fadeInUp`, `fadeInLeft`, `fadeInRight`

---

## 🗄️ Database Models

### User
```js
{
  name:      String,           // required
  email:     String,           // required, unique
  password:  String,           // bcrypt hashed
  cartData:  Object,           // { foodId: quantity }
  favorites: [String],         // array of food item _ids
  image:     String,           // Cloudinary URL
  public_id: String,           // Cloudinary public_id (for deletion)
  createdAt: Date,             // auto (timestamps: true)
  updatedAt: Date
}
```

### Food
```js
{
  name:        String,         // required
  description: String,         // required
  price:       Number,         // required
  image:       String,         // Cloudinary URL
  category:    String,         // e.g. "Burger", "Salad"
  public_id:   String,         // Cloudinary public_id
  createdAt:   Date,
  updatedAt:   Date
}
```

### Order
```js
{
  userId:    String,           // ref to User._id
  items:     Array,            // [{ name, price, quantity, image, ... }]
  amount:    Number,           // total including delivery
  address:   Object,           // { firstName, lastName, street, city, ... }
  status:    String,           // "Food Processing" | "Out for Delivery" | "Delivered"
  payment:   Boolean,          // true = paid (COD sets true immediately)
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login → returns JWT |
| GET | `/api/auth/user-data` | ✅ | Get current user info |
| POST | `/api/auth/add-image` | ✅ | Upload profile photo |
| DELETE | `/api/auth/remove-image` | ✅ | Remove profile photo |

### Food
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/food/get` | ❌ | List all food items |
| POST | `/api/food/add` | ✅ | Add food item (admin) |
| DELETE | `/api/food/remove` | ✅ | Remove food item (admin) |

### Cart
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/cart/get` | ✅ | Get user's cart |
| POST | `/api/cart/add` | ✅ | Add / increment item |
| PUT | `/api/cart/remove` | ✅ | Decrement / remove item |

### Favorites
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/favorites/get` | ✅ | Get favorites list |
| POST | `/api/favorites/add` | ✅ | Add item to favorites |
| DELETE | `/api/favorites/remove` | ✅ | Remove item from favorites |

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/order/place` | ✅ | Place order (COD or Stripe) |
| POST | `/api/order/verify` | ❌ | Confirm payment result |
| GET | `/api/order/history` | ✅ | Paginated history + stats |
| GET | `/api/order/user-orders` | ✅ | Paginated orders (legacy) |
| GET | `/api/order/orders` | ✅ | All orders (admin) |
| PUT | `/api/order/update-status` | ✅ | Update order status (admin) |

> **Auth header:** `token: <jwt_token>`

---

## 💳 Payment

### Cash on Delivery (default — no setup needed)
Orders are saved immediately with `payment: true`. Works out of the box.

### Stripe (optional)
1. Create a free account at [stripe.com](https://stripe.com)
2. Get your secret key from the Stripe dashboard
3. Add to `.env.local`:
   ```env
   STRIPE_SECRET_KEY=sk_test_51...
   ```
4. Select "Pay Online (Stripe)" on the checkout page

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | `#ff6b6b` → `#ee5a6f` (gradient) |
| Font | Poppins (Google Fonts) |
| Border radius | `rounded-3xl` (cards), `rounded-full` (buttons/badges) |
| Shadow | `shadow-lg` + `hover:shadow-xl` |
| Animation | `fadeIn`, `fadeInUp`, `fadeInLeft`, `fadeInRight` (CSS keyframes) |
| Skeleton | `.skeleton` shimmer class (pure CSS, no library) |

---

## 🛠️ Admin Panel

A separate React + Vite admin panel lives in the `/admin` folder. It connects to the same backend and allows:
- Adding / removing food items with image upload
- Viewing all orders
- Updating order status (Processing → Out for Delivery → Delivered)

To run the admin panel:
```bash
cd admin
npm install
npm run dev
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Grid columns |
|---|---|
| Mobile (`< sm`) | 1 column |
| Tablet (`sm`) | 2 columns |
| Desktop (`lg`) | 3 columns |
| Wide (`xl`) | 4 columns |

---

## 🗂️ Key Files Quick Reference

| File | Purpose |
|---|---|
| `src/context/StoreContext.jsx` | Global state — cart, token, favorites, food data |
| `src/lib/auth.js` | JWT sign/verify + `authMiddleware` for API routes |
| `src/lib/db.js` | Mongoose connection with global cache |
| `src/components/OrderHistoryPanel.jsx` | Reusable order history used in profile + my-orders |
| `src/components/ProductPopup.jsx` | Full product detail modal |
| `src/components/Avatar.jsx` | Initials avatar fallback |
| `src/components/PageLoader.jsx` | Top progress bar on navigation |
| `src/components/ScrollToTop.jsx` | Auto scroll-to-top on route change |
| `src/components/skeletons/PageSkeleton.jsx` | 7 page-specific loading skeletons |
