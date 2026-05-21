# Retao

A mobile peer-to-peer lending marketplace — list items you own, and discover and borrow items from people near you. Built with Expo and React Native.

## Features

- **Onboarding & auth** — multi-step sign-up (profile, avatar, bio, location) with email/password and Apple sign-in
- **Listings** — create listings with photos, categories, and location through a guided multi-step flow; edit and manage your own listings
- **Discovery** — browse items by category and by location, with map-based search
- **Borrow requests** — request items and track request status
- **Wishlist** — save items you're interested in
- **Messaging** — real-time chat between lenders and borrowers
- **Ratings & history** — rate exchanges and review your borrowing history
- **Subscriptions** — paid plans via in-app purchases (RevenueCat)
- **Internationalization** — multi-language support

## Tech stack

- **Framework:** Expo SDK 53, React Native 0.79, Expo Router 5, TypeScript
- **Data:** TanStack React Query
- **Forms:** React Hook Form + Zod
- **Maps & location:** react-native-maps, expo-location
- **Payments:** react-native-iap, RevenueCat (react-native-purchases)
- **UI/UX:** Moti, Reanimated, Lottie, Gorhom Bottom Sheet
- **Auth & storage:** expo-secure-store, expo-apple-authentication
- **i18n:** i18n-js

The REST + WebSocket API for this app lives in [Retao_backend](https://github.com/Okekejr/Retao_backend).

## Getting started

```bash
npm install
npx expo start
```

Open the app in an iOS simulator, Android emulator, or a development build. Create a `.env` file with your API base URL before running.

### Scripts

| Command | Description |
| ------- | ----------- |
| `npm start` | Start the Expo dev server |
| `npm run ios` | Build and run on iOS |
| `npm run android` | Build and run on Android |
| `npm run web` | Run in the browser |
