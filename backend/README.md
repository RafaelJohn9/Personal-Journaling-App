# Personal Journal App Backend

## Architecture Overview

The backend architecture of the Personal Journal App is structured as follows:

```note
├── app
│   ├── api_v1.py                 # API version routes
│   ├── config.py                 # Configuration settings
│   ├── __init__.py               # App initialization
│   ├── manage.py                 # Management script
│   ├── models                    # Database models
│   │   ├── __init__.py
│   │   ├── journal.py            # Journal model
│   │   └── user.py               # User model
│   ├── resources                 # API resources
│   │   ├── auth.py               # Authentication endpoints
│   │   ├── errors.py             # Error handling
│   │   ├── journal_endpoints.py  # Journal endpoints
│   │   └── __init__.py
│   └── utils                     # Utility functions
│       ├── otp.py                # OTP generation and verification
│       └── __init__.py
├── dockerfile                    # Docker configuration
├── manage.py                     # Management script
├── migrations                    # Database migrations
├── migration.sh                  # Migration script
├── requirements.txt              # Python dependencies
├── run.sh                        # Run script
├── tests                         # Unit tests
│   ├── test_auth.py              # Authentication tests
│   ├── test_journal.py           # Journal tests
│   └── __init__.py
```

## Routes and Endpoints

## BaseUrl = URL/api/v2

*Wish to test: try [https://www.johnmkagunda.me/api/v2/<endpoint\>](https://www.johnmkagunda.me/api/v2/<endpoint>)*

### Authentication Routes (`auth.py`)

1. **Register User**
   - **Method:** `POST`
   - **Endpoint:** `/register`
   - **Description:** Registers a new user.
   - **Importance:** Allows new users to create an account in the system.

2. **Login User**
   - **Method:** `POST`
   - **Endpoint:** `/login`
   - **Description:** Authenticates a user and returns a JWT token.
   - **Importance:** Provides a way for users to log in and access protected routes.

3. **Logout User**
   - **Method:** `POST`
   - **Endpoint:** `/logout`
   - **Description:** Revokes a users access token thus logging out.
   - **Importance:** Provides a way for users to log out.

4. **Send OTP**
   - **Method:** `POST`
   - **Endpoint:** `/send_otp`
   - **Description:** Sends OTP to the user's email
   - **Importance:** Ensures that the user has access to the provided email address.

5. **OTP Verification**
   - **Method:** `POST`
   - **Endpoint:** `/verify_otp`
   - **Description:** Verifies the OTP sent to the user's email.
   - **Importance:** Ensures that the user has access to the provided email address.

6. **Password Reset**
   - **Method:** `POST`
   - **Endpoint:** `/update_password`
   - **Description:** Allows users to reset their password.
   - **Importance:** Provides a mechanism for users to regain access to their accounts if they forget their password.

7. **Check User Exists**
   - **Method:** `POST`
   - **Endpoint:** `/check_user_exists`
   - **Description:** Checks if a user exists in the database
   - **Importance:**  Maybe used as pings for security purposes

### Journal Routes (`journal_endpoints.py`)

1. **Create Journal Entry**
   - **Method:** `POST`
   - **Endpoint:** `/journals`
   - **Description:** Creates a new journal entry.
   - **Importance:** Allows users to create and store journal entries.

2. **Get All Journal Entries**
   - **Method:** `GET`
   - **Endpoint:** `/journals`
   - **Description:** Retrieves all journal entries for the authenticated user.
   - **Importance:** Enables users to view their journal entries.

3. **Get Single Journal Entry**
   - **Method:** `GET`
   - **Endpoint:** `/journals/<journal_id>`
   - **Description:** Retrieves a single journal entry by its ID.
   - **Importance:** Allows users to view specific journal entries.

4. **Update Journal Entry**
   - **Method:** `PUT`
   - **Endpoint:** `/journals/<journal_id>`
   - **Description:** Updates an existing journal entry by its ID.
   - **Importance:** Provides functionality for users to edit their journal entries.

5. **Delete Journal Entry**
   - **Method:** `DELETE`
   - **Endpoint:** `/journals/<journal_id>`
   - **Description:** Deletes a journal entry by its ID.
   - **Importance:** Allows users to remove journal entries they no longer need.

### Error Handling (`errors.py`)

- **Error Handlers:**
  - Custom error handlers for various HTTP status codes (e.g., 404, 500).
  - **Importance:** Provides user-friendly error messages and improves the robustness of the API.

### Prerequisites

- Python 3.10+
- MySQL 5.7+   =>   storing data
- Redis        =>   storing access tokens and OTP for  limited amount of time.
- Docker

## Testing

- To run the tests, use the following command:

```bash
    pytest tests
```
