# Backend Structure

## Folder Structure

```
backend/
├── controllers/
│   └── auth.controllers.js
├── db/
├── middleware/
├── models/
│   └── user.models.js
├── routes/
├── services/
│   ├── user.service.js
│   └── index.js
├── utils/
│   └── generateToken.js
├── server.js
└── README.md
```

## Services

### User Service (`services/user.service.js`)

The user service contains all business logic related to user operations:

1. **createUser** - Create a new user with hashed password
2. **findUserById** - Find a user by their ID
3. **findUserByUserName** - Find a user by their username
4. **findUserByEmail** - Find a user by their email
5. **updateUserProfile** - Update user profile information
6. **updateUserPassword** - Update user password with validation
7. **deleteUser** - Delete a user account
8. **setPasswordResetToken** - Set password reset token for email-based password reset
9. **clearPasswordResetToken** - Clear password reset token after use
10. **setEmailVerificationToken** - Set email verification token for new accounts
11. **verifyEmail** - Mark user email as verified
12. **findUserByResetToken** - Find user by password reset token
13. **findUserByVerificationToken** - Find user by email verification token

## Usage

To use the user service in controllers:

```javascript
import { createUser, findUserById } from "../services/user.service.js";

// Create a new user
const newUser = await createUser({ userName, email, password });

// Find user by ID
const user = await findUserById(userId);
```

## Authentication Flow

1. **Signup**: Creates user with hashed password and generates JWT tokens
2. **Login**: Validates credentials and generates new JWT tokens
3. **Logout**: Clears tokens from client and database
4. **Token Refresh**: Generates new access token using refresh token
5. **Protected Routes**: Middleware validates access token from cookie

## Token Management

- **Access Tokens**: Sent in HTTP-only cookies, 60-minute expiration
- **Refresh Tokens**: Stored in database, 15-day expiration