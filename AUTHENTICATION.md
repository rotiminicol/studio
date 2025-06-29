# Authentication Setup

## Overview
Fluxpense uses Xano for authentication and API services. The app includes a fallback mock authentication system for development when the real API is not configured.

## Environment Variables

To use the real Xano authentication, create a `.env.local` file in the root directory with the following variables:

```env
# Xano API Configuration
NEXT_PUBLIC_XANO_AUTH_API_URL=https://your-project.xano.app/api:auth
NEXT_PUBLIC_XANO_API_URL=https://your-project.xano.app/api:fluxpense
NEXT_PUBLIC_XANO_GOOGLE_OAUTH_API_URL=https://your-project.xano.app/api:google-oauth
```

## Mock Authentication (Development)

When the environment variables are not set, the app automatically uses mock authentication:

- **Login**: Use any email with password "password"
- **Signup**: Creates a new mock user account
- **Google OAuth**: Simulates Google login flow
- **Data**: Stored in memory (resets on page refresh)

## Features

### Real Authentication (Xano)
- Secure user authentication
- Persistent user sessions
- Google OAuth integration
- User data persistence
- Onboarding flow

### Mock Authentication (Development)
- Quick development setup
- No external dependencies
- Demo user accounts
- Simulated API delays
- Full feature testing

## Usage

1. **For Development**: No setup required - mock auth works out of the box
2. **For Production**: Configure Xano API endpoints in environment variables
3. **Testing**: Use mock auth for feature testing without API setup

## Troubleshooting

### 404 Errors
- Check if environment variables are properly set
- Verify Xano API endpoints are correct
- Ensure Xano project is running and accessible

### Mock Auth Issues
- Clear browser localStorage to reset mock sessions
- Check browser console for error messages
- Verify the mock auth notice appears on the login page 