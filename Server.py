891011121314151617181920212223456123
ROOT_DIR
Jul 22, 12:55 AM

Viewed
/app/design_guidelines.json
34567891011121314151612
Jul 22, 12:55 AM

Excellent design guidelines. Let me plan and build.

<Plan>
**Backend** (`/app/backend/server.py`):
MongoDB collections: users, bookings, services, equipment, otps
Endpoints:
POST /api/auth/send-otp, POST /api/auth/verify-otp (mock OTP=123456, JWT), GET /api/auth/me, PUT /api/auth/profile
GET /api/services, GET /api/equipment
POST /api/bookings, GET /api/bookings, GET /api/bookings/{id}, PATCH /api/bookings/{id}/cancel
POST /api/contact (contact form)
Seed services & equipment on startup
**Frontend** structure:
_layout.tsx — keep icon prewarming, add SafeAreaProvider + GestureHandlerRootView
index.tsx — auth splash/router
auth/login.tsx, auth/otp.tsx, auth/profile-setup.tsx
(tabs)/_layout.tsx — bottom tabs (Home, Services, Bookings, Profile)
(tabs)/index.tsx — Home (categories, featured, active booking card)
(tabs)/services.tsx — Services + Equipment tabs
(tabs)/bookings.tsx — Booking list
(tabs)/profile.tsx — Profile & support
booking/new.tsx — Booking form
booking/[id].tsx — Tracking with timeline
info/[page].tsx — About/FAQ/Contact/etc.
Store token in expo-secure-store; utility for API calls
</Plan>
$ cd /app/frontend && yarn expo install expo-image...
Jul 22, 12:56 AM


View Preview
