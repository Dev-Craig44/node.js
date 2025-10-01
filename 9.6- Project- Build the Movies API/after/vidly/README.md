# Vidly - local dev notes

Short notes to run and to use the debug helpers in this folder.

## Required env var

- The app expects a JWT signing key provided via the environment variable `vidly_jwtPrivateKey`. Example when starting locally:

```bash
cd "9.6- Project- Build the Movies API/after/vidly"
vidly_jwtPrivateKey=your_local_secret npx nodemon index.js
```

## Debug DB disconnect/reconnect routes

To simulate the database being down without stopping your system MongoDB, a small debug route is included:

- POST /api/\_debug/db/disconnect — calls `mongoose.disconnect()` to simulate the DB going down
- POST /api/\_debug/db/reconnect — calls `mongoose.connect()` to reconnect

These routes are disabled by default. Enable them only for local testing by setting:

```bash
export ENABLE_DEBUG_ROUTES=1
vidly_jwtPrivateKey=your_local_secret npx nodemon index.js
```

## Testing flow

1. Start the app with `ENABLE_DEBUG_ROUTES=1` and `vidly_jwtPrivateKey` set.
2. POST to `/api/_debug/db/disconnect` to disconnect mongoose.
3. Send the request you want to test (e.g., GET /api/genres) — this should fail and exercise your global error handler.
4. POST to `/api/_debug/db/reconnect` to restore the DB connection.

## Safety

- Do not enable these routes in production. They allow intentional disruption of the app's DB connection and are only for local debugging.
- Consider removing or guarding them further before pushing public changes.

# 🔐 Environment Variables & Config Setup (Node.js + Config Package)

## 📚 What I Learned

While building a secure Node.js API with `config` and `jsonwebtoken`, I ran into a critical issue:

> `FATAL ERROR: jwtPrivateKey is not defined`

Even though I used `export` in my terminal and verified the variable was set with `echo`, my app still crashed when running `nodemon index.js`.

---

## 🧠 What Was Actually Happening?

### ✅ `export` works... but **only in the terminal it was set**

When I split my VS Code terminal:

- Right pane: ran `export vidly_jwtPrivateKey=MySecureKey`
- Left pane: ran `nodemon index.js`

🛑 **Problem**: Environment variables set in one terminal **don’t carry over** to another. They live only in the shell session where they were created.

---

## ✅ What Fixed It

### Option 1: Run Both Commands in the Same Terminal

```bash
export vidly_jwtPrivateKey=MySecureKey
nodemon index.js
```

# 🔐 Authentication & Authorization in Node.js (Vidly API)

## 📚 Summary of Key Concepts

### ✅ Authentication vs Authorization

- **Authentication** = Confirming the user _is who they claim to be_ (e.g., email + password).
- **Authorization** = Checking if the _authenticated user is allowed_ to perform a specific action.

---

### 🔐 Password Hashing with Bcrypt

```js
// Hashing passwords
const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash("1234", salt);

// Validating passwords
const isValid = await bcrypt.compare("1234", hashed);
```

## Handling Errors

- Send a friendly error
- Log the exception

By default is there is no connection MongoDB will try to reconnect 30 times with 1 second intervals.

With our current implementation if MongoDB shuts down for more than 30secs it will not fire back up.
