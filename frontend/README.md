# Personal Journal App Frontend

## Architecture Overview

The frontend architecture of the Personal Journal App is structured as follows:

```note
.
├── app
│   ├── index.jsx                 # Main entry point for the application
│   └── _layout.jsx               # Layout component for the application
├── assets                        # Static assets (images, fonts, etc.)
│   ├── fonts                     # fonts directory
│   └── images                    # images directory
├── components                    # Reusable components
│   ├── Auth                      # Authentication components
│   │   ├── ForgotPass_EmailRequest.js # Component for requesting password reset email
│   │   ├── Login.js              # Component for login
│   │   ├── OtpVerification.js    # Component for OTP verification
│   │   ├── PasswordReset.js      # Component for password reset
│   │   └── Register.js           # Component for registration
│   └── Journal                   # Journal-related components
│       ├── CreateJournal.js      # Component for creating a journal
│       ├── EditJournal.js        # Component for editing a journal
│       ├── JournalItem.js        # Component for displaying a single journal item
│       └── JournalList.js        # Component for displaying a list of journals
├── middlewares                   # Middleware functions
│   ├── authMiddleware.js         # Authentication middleware
│   ├── globals.js                # Global middleware
│   └── journalMiddleware.js      # Journal-related middleware
├── navigation                    # Navigation configuration
│   └── AppNavigator.js           # Main navigation component
├── screens                       # Screen components
│   ├── CreateJournalScreen.js    # Screen to create a journal entry
│   ├── EditJournalScreen.js      # Screen to edit a journal entry
│   ├── ForgotPass_EmailScreen.js # Screen to input email for password reset
│   ├── JournalListScreen.js      # Screen to list journal entries
│   ├── LandingScreen.js          # Landing screen
│   ├── LoginScreen.js            # Login screen
│   ├── OtpVerificationScreen.js  # Screen for OTP verification
│   ├── PasswordResetScreen.js    # Screen to reset password
│   └── RegisterScreen.js         # Register screen
├── scripts                       # Utility scripts
│   └── reset-project.js          # Script to reset the project
└── tailwind.config.js            # Tailwind CSS configuration
```

## Components

### Auth Components (`components/Auth`)

1. **ForgotPass_EmailRequest**
   - **Component:** `ForgotPass_EmailRequest.js`
   - **Description:** Handles email input for password reset.
   - **Importance:** Provides an interface for users to request a password reset.

2. **Login**
   - **Component:** `Login.js`
   - **Description:** Handles user login.
   - **Importance:** Enables users to log into their accounts.

3. **OtpVerification**
   - **Component:** `OtpVerification.js`
   - **Description:** Verifies the OTP sent to the user's email.
   - **Importance:** Ensures that the user has access to the provided email address.

4. **PasswordReset**
   - **Component:** `PasswordReset.js`
   - **Description:** Handles password reset.
   - **Importance:** Provides a mechanism for users to reset their password.

5. **Register**
   - **Component:** `Register.js`
   - **Description:** Handles user registration.
   - **Importance:** Allows new users to create an account.

### Journal Components (`components/Journal`)

1. **CreateJournal**
   - **Component:** `CreateJournal.js`
   - **Description:** Handles the creation of new journal entries.
   - **Importance:** Enables users to create and store new journal entries.

2. **EditJournal**
   - **Component:** `EditJournal.js`
   - **Description:** Handles editing existing journal entries.
   - **Importance:** Allows users to edit and update their journal entries.

3. **JournalItem**
   - **Component:** `JournalItem.js`
   - **Description:** Displays a single journal entry.
   - **Importance:** Provides a detailed view of a journal entry.

4. **JournalList**
   - **Component:** `JournalList.js`
   - **Description:** Displays a list of journal entries.
   - **Importance:** Allows users to view all their journal entries.

## Screens

### Authentication Screens (`screens`)

1. **Login Screen**
   - **File:** `LoginScreen.js`
   - **Description:** Screen for user login.

2. **Register Screen**
   - **File:** `RegisterScreen.js`
   - **Description:** Screen for user registration.

3. **OtpVerification Screen**
   - **File:** `OtpVerificationScreen.js`
   - **Description:** Screen for OTP verification.

4. **Password Reset Screen**
   - **File:** `PasswordResetScreen.js`
   - **Description:** Screen to reset the user's password.

5. **Forgot Password Email Screen**
   - **File:** `ForgotPass_EmailScreen.js`
   - **Description:** Screen to input email for password reset.

### Journal Screens (`screens`)

1. **Journal List Screen**
   - **File:** `JournalListScreen.js`
   - **Description:** Screen to list all journal entries.

2. **Create Journal Screen**
   - **File:** `CreateJournalScreen.js`
   - **Description:** Screen to create a new journal entry.

3. **Edit Journal Screen**
   - **File:** `EditJournalScreen.js`
   - **Description:** Screen to edit an existing journal entry.

### Other Screens (`screens`)

1. **Landing Screen**
   - **File:** `LandingScreen.js`
   - **Description:** The landing page of the application.

## Middlewares (`middlewares`)

1. **Authentication Middleware**
   - **File:** `authMiddleware.js`
   - **Description:** Middleware functions for authentication.
   - **Importance:** Ensures secure access to protected routes.

2. **Journal Middleware**
   - **File:** `journalMiddleware.js`
   - **Description:** Middleware functions for handling journal entries.
   - **Importance:** Manages state and API calls for journal-related actions.

3. **Global Middleware**
   - **File:** `globals.js`
   - **Description:** General middleware functions and variables definition.
   - **Importance:** Provides global configurations and helpers to middlewares.
