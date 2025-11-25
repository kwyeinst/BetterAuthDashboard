# Better Auth Forgot Password Tutorial

This Next.js project demonstrates how to implement a production-ready forgot password functionality using better-auth, Prisma, PostgreSQL, and Resend for email delivery.

## Features

- User authentication (signup/login)
- Forgot password flow with email delivery
- Password reset with token validation
- Protected dashboard route
- PostgreSQL database with Prisma ORM
- Production-ready email templates with Resend

## Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install

# or

pnpm install

# or

yarn install
\`\`\`

### 2. Environment Variables

Create a `.env` file in the root directory:

\`\`\`env

# Database

DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Better Auth

BETTER_AUTH_SECRET="your-secret-key-min-32-characters-long"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Resend Email Service

RESEND_API_KEY="re_your_api_key_here"
RESEND_FROM_EMAIL="onboarding@yourdomain.com"
\`\`\`

#### Getting Your Resend API Key

1. Sign up for a free account at [resend.com](https://resend.com)
2. Go to the API Keys section in your dashboard
3. Create a new API key and copy it
4. Add it to your `.env` file as `RESEND_API_KEY`

**For Development:**

- Use `onboarding@resend.dev` as your `RESEND_FROM_EMAIL`
- This allows you to test without verifying a domain

**For Production:**

1. Verify your custom domain in Resend dashboard
2. Update `RESEND_FROM_EMAIL` to use your domain (e.g., `noreply@yourdomain.com`)

### 3. Database Setup

Run Prisma migrations to create the database tables:

\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

### 4. Run the Development Server

\`\`\`bash
npm run dev

# or

pnpm dev

# or

yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Forgot Password Flow (Production-Ready)

1. **User requests password reset** (`/forgot-password`)
   - User enters their email address
   - System generates a secure reset token
   - Token is stored in the `Verification` table with expiration
   - Email is sent via Resend with reset link

2. **User receives email**
   - Professional HTML email template
   - Secure reset link with token
   - Link expires in 1 hour
   - Clear instructions and security warnings

3. **User clicks reset link** (`/reset-password?token=...`)
   - Token is validated from URL
   - User enters new password
   - Password is securely hashed and updated
   - Old token is invalidated

4. **User logs in with new password** (`/login`)
   - Authentication with new credentials
   - Access to protected dashboard

### Key Files

**Authentication:**

- `lib/auth.ts` - Better-auth configuration with email sending
- `lib/auth-client.ts` - Client-side auth functions
- `app/api/auth/[...all]/route.ts` - Auth API routes

**Email Service:**

- `lib/resend.ts` - Resend client configuration
- `emails/reset-password-email.tsx` - Professional email template

**Database:**

- `prisma/schema.prisma` - Database schema
- `lib/prisma.ts` - Prisma client singleton

**Pages:**

- `app/login/page.tsx` - Login form
- `app/signup/page.tsx` - Signup form
- `app/forgot-password/page.tsx` - Forgot password form
- `app/reset-password/page.tsx` - Reset password form
- `app/dashboard/page.tsx` - Protected dashboard

## Database Schema

The project uses four main tables:

- **User** - User accounts with email and name
- **Account** - Authentication providers and hashed passwords
- **Session** - Active user sessions with expiration
- **Verification** - Email verification and password reset tokens

## Email Template Features

The reset password email includes:

- Professional, responsive HTML design
- Clear call-to-action button
- Fallback text link for accessibility
- Security warnings and expiration notice
- Mobile-friendly layout
- Branded styling (customizable)

## Security Considerations

### Implemented Security Features:

- Passwords hashed with better-auth's built-in bcrypt
- Reset tokens expire after 1 hour
- Tokens are single-use (invalidated after reset)
- Secure token generation
- HTTPS enforcement in production
- Email validation

### Additional Recommendations for Production:

1. **Rate Limiting** - Implement rate limiting on password reset requests
2. **CAPTCHA** - Add CAPTCHA to prevent automated abuse
3. **Monitoring** - Log failed attempts and suspicious activity
4. **Email Verification** - Enable `requireEmailVerification: true` in auth config
5. **Strong Secrets** - Use cryptographically secure `BETTER_AUTH_SECRET` (32+ chars)
6. **Domain Verification** - Verify your domain with Resend for production
7. **Error Handling** - Integrate error monitoring (Sentry, DataDog, etc.)

## Testing the Flow

### Development Testing:

1. Start the dev server: `npm run dev`
2. Sign up for a new account at `/signup`
3. Go to `/forgot-password` and enter your email
4. Check your email inbox for the reset link
5. Click the link or copy the URL
6. Enter your new password at `/reset-password`
7. Log in with your new password at `/login`

### Email Testing:

- Resend provides a testing environment
- Check the Resend dashboard for sent emails
- View email logs and delivery status
- Test email rendering across clients

## Customization

### Email Template:

Edit `emails/reset-password-email.tsx` to customize:

- Colors and branding
- Logo and header
- Email copy and messaging
- Footer information

### Auth Configuration:

Edit `lib/auth.ts` to customize:

- Token expiration time
- Email verification requirements
- Session duration
- Additional auth providers

## Troubleshooting

**Emails not sending:**

- Check `RESEND_API_KEY` is correct
- Verify `RESEND_FROM_EMAIL` is valid
- Check Resend dashboard for errors
- Ensure you're using `onboarding@resend.dev` for development

**Database connection errors:**

- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Run `npx prisma generate` and `npx prisma db push`

**Token validation fails:**

- Tokens expire after 1 hour
- Tokens are single-use only
- Check URL has the complete token parameter

## Production Deployment

Before deploying to production:

1. Set strong environment variables
2. Verify your domain with Resend
3. Update `RESEND_FROM_EMAIL` to your domain
4. Enable HTTPS (automatic on Vercel)
5. Set up database backups
6. Implement rate limiting
7. Add monitoring and logging
8. Test the complete flow

## Resources

- [Better Auth Documentation](https://better-auth.com)
- [Resend Documentation](https://resend.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
