# Node.js Course Notebook

This repository contains course exercises and projects from your Node.js studies. Below you'll find an index of projects, quick run instructions, and aggregated notes pulled from READMEs in subfolders so your future self has one place to look.

---

## Quick Start

- Use Node 18+ (consider adding an `.nvmrc` to the repo root).
- Run each project from its folder and install dependencies locally:

```bash
cd "9.6- Project- Build the Movies API/after/vidly"
npm install
vidly_jwtPrivateKey=YourLocalKey npx nodemon index.js
```

Notes:

- Put secrets in `~/.zshrc` or a local `.env` (don't commit `.env`).
- If projects conflict on port 3000, change the port via env or config.

---

## Index of projects

- [9.6 - Project: Build the Movies API (vidly)](9.6-%20Project-%20Build%20the%20Movies%20API/after/vidly/README.md)
- [4.1 - Express (public/readme.txt)](4.1-%20Express/after/public/readme.txt)
- [College (public/readme.txt)](College/public/readme.txt)

---

## Aggregated subfolder notes

### 9.6 - Project: Build the Movies API (vidly)

````markdown
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

By default if there is no connection MongoDB will try to reconnect 30 times with 1 second intervals.

With our current implementation if MongoDB shuts down for more than 30secs it will not fire back up.
````

### 4.1 - Express / after/public/readme.txt

```text
This is a readme file!
```

### College / public/readme.txt

```text
This is a readme file! I love this shit!
```

---

## Next steps & maintenance tips for future you

- Keep adding short notes inside each project folder's README — I'll keep aggregating them here if you want.
- Use `git subtree` for importing subprojects while keeping history (we used that already for vidly).
- Add an `.nvmrc` for the Node version and a root `Makefile` or `scripts` in `package.json` to start common projects quickly.

---

If you want this aggregated file to update automatically, I can add a small Node script or npm task that rebuilds this section by scanning the repository.

---

## Index of course / project folders

Below are the project folders in this repository with links to their README files (if present).

- [9.6 - Project: Build the Movies API (vidly)](9.6-%20Project-%20Build%20the%20Movies%20API/after/vidly/README.md) — Notes about env vars, authentication, and error handling.

Other READMEs and notes in this repo:

- [4.1 - Express: public/readme.txt](4.1-%20Express/after/public/readme.txt) — "This is a readme file!"
- [College: public/readme.txt](College/public/readme.txt) — "This is a readme file! I love this shit!"

_I've kept all subfolder README files untouched and linked them above so your future self can find context quickly._

## Express Async Errors

Our try/catch saved us from repetitive try/catch blocks, but we have to remember to call it EVERY TIME.

- Download NPM package `npm i express-async-errors`

## Logging Errors Using Winston

The Windston logger has what we call a `Transport` which is a storage device for our logs

- Console
- File
- HTTP

We can log messages in:

- MongoDB
- CouchDB
- Reddis
- Loggly

---

## UPGRADE_NOTES — logging & dependency upgrades

This section documents a step-by-step upgrade performed on the `9.6 - Project: Build the Movies API (vidly)` project. Use this as a reference for what changed and why.

Summary of what we did

- Upgraded `winston` to v3 and switched the project to use `createLogger`.
- Upgraded `winston-mongodb` to v7 and attached the transport after Mongoose connects so logs use the same DB.
- Upgraded `mongoose` to v7 to align with modern MongoDB drivers and removed deprecated connection options.
- Upgraded `joi` to v17 and migrated validation code to the `schema.validate(value)` API.

Important commits (on branch `upgrade/logging-stack`)

- Baseline snapshot before upgrades: 7eef455
- Move to winston v3 and switch error middleware: d556992
- Install winston v3 (package update): f5f5be1
- Install winston-mongodb v7 (package update): 7ef6da6
- Attach winston-mongodb transport after mongoose connect: 4f851a4
- Upgrade mongoose to v7 (package update): 3e1b23d
- Remove deprecated connect options & transport cleanup: 1077136
- Upgrade Joi to v17 and update validations: 0e05d21

Commands used (examples)

- Install a specific package version:

```bash
cd "9.6- Project- Build the Movies API/after/vidly"
npm install winston@^3.18.3
npm install winston-mongodb@^7.0.1
npm install mongoose@^7.8.7
npm install joi@^17.13.3
```

- Start the app for smoke tests (development only):

```bash
PORT=3000 vidly_jwtPrivateKey=test node index.js
```

Verification performed

- Confirmed server starts and connects to MongoDB.
- Confirmed `MongoDB transport attached to logger ✅` printed at startup.
- Triggered `/api/genres` (intentional error) and verified the error document was inserted into `vidly.logs` (visible in Compass or via `mongosh`).

Notes & follow-ups

- There were a few deprecation warnings from older code paths during the process; they were resolved by upgrading the relevant packages (notably mongoose).
- Keep commits small and focused — this branch preserves the history of each step so you can review the changes later.
- Next recommended steps: run linting, add tests, and optionally upgrade remaining minor dependencies one-by-one.
- Next recommended steps: run linting, add tests, and optionally upgrade remaining minor dependencies one-by-one.

---

## Node.js / MongoDB upgrade notes (local environment)

Short summary of what I did while upgrading MongoDB locally for the Vidly project:

- Backup: created a logical dump of the `vidly` database with `mongodump` and saved it to:
  - `~/backups/vidly-2025-10-11-1949`
- Staged upgrade: the system data was originally on MongoDB 6.0. I installed `mongodb-community@7.0` and started it, then advanced the cluster Feature Compatibility Version (FCV) to `7.0` using:
  - `mongosh --eval "db.getSiblingDB('admin').runCommand({setFeatureCompatibilityVersion: '7.0', confirm: true})"`
- 8.x trial: Homebrew had `mongodb-community` 8.2.1 installed and `/opt/homebrew/bin/mongod` pointed at 8.2.1, but attempting to start 8.x against the existing data directory failed because the admin FCV was still `7.0`. MongoDB 8.x refuses to run when the data's FCV is not in the 8.x family (this is expected and safeguards data).
- Decision: to avoid disruption, I kept the system service running on MongoDB 7.x for this machine. The application and logging stack were validated against the running 7.0 instance.

Quick reproduction / rollback commands (safe, conservative)

1. Create a logical backup of the vidly DB (already done):

```bash
BACKUP_DIR=~/backups/vidly-$(date +%F-%H%M)
mongodump --db=vidly --out="$BACKUP_DIR"
```

2. If you want to try 8.x without touching the system service, run an isolated 8.x mongod on a different port/dbpath and restore the dump there:

```bash
# start an 8.x mongod on port 27018 with a fresh dbpath
mkdir -p ~/mongodb-test-8x-db
/opt/homebrew/Cellar/mongodb-community/8.2.1/bin/mongod --dbpath ~/mongodb-test-8x-db --port 27018 --bind_ip 127.0.0.1 --logpath ~/mongodb-test-8x-db/mongod.log --logappend &

# restore vidly into the test server
mongorestore --port 27018 --nsInclude="vidly.*" ~/backups/vidly-2025-10-11-1949/vidly

# smoke test
mongosh --port 27018 --quiet --eval "db.getSiblingDB('vidly').test.insertOne({smoke: true, time: new Date()}); print('count:', db.getSiblingDB('vidly').test.countDocuments())"
```

3. If you later decide to switch the system service to 8.x (ONLY after a successful restore/test and with a backup), stop the 7.x service, move the data directory aside, start the generic Homebrew `mongodb-community` service (8.x), and then set FCV to `8.0`:

```bash
brew services stop mongodb-community@7.0
TIMESTAMP=$(date +%F-%H%M)
mv /opt/homebrew/var/mongodb /opt/homebrew/var/mongodb.bak-$TIMESTAMP
brew services start mongodb-community

# verify server is 8.x then set FCV
mongosh --quiet --eval "print('server', db.version())"
mongosh --quiet --eval "db.getSiblingDB('admin').runCommand({setFeatureCompatibilityVersion: '8.0', confirm: true})"
```

Notes:

- The logical backup is stored in `~/backups/vidly-2025-10-11-1949` (keep it safe).
- I validated the Node app and logging on the running 7.0 instance and left the service on 7.x so other local projects won't be disrupted.

## How to handle uncaught exceptions

To handle uncaught exceptions in Node.js, use the following pattern at the very top of your entry file (`index.js`):

```js
process.on("uncaughtException", (ex) => {
  // Log the exception using Winston or another logger
  winston.error(ex.message, ex);
  process.exit(1); // Optional: exit the process
});
```

For unhandled promise rejections:

```js
process.on("unhandledRejection", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});
```

We added these handlers while upgrading the logging stack, ensuring all unexpected errors are logged and the app exits cleanly. This complements the new Winston setup and keeps error tracking robust.

## Unhandled Promise Rejection

The method we used to catch uncaught exception w/ the process.on method only works with synchronous code. So if we have a promise somewhere that gets rejected, the process.on method will not catch it.

Just like uncaught exceptions, we can also listen for unhandled promise rejections:

```js
process.on("unhandledRejection", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});
```

When handling uncaught exceptions or unhandled promise rejections, you should terminate the Node process after logging the error. This is important because the application may be left in an inconsistent or unstable state.

**Best practice:** Exit the process and rely on a process manager (like PM2 or Docker) to automatically restart your app.

### ⚠️ About Winston `exceptionHandlers` and logfile naming

When using Winston's `exceptionHandlers` and `rejectionHandlers` to capture
uncaught exceptions and unhandled promise rejections, pick a dedicated filename
for those handlers that is different from your regular runtime logfile (for
example, `uncaughtExeptions.log` vs `logfile.log`). Reasons:

- Isolation: crash/exception files capture stack traces and crash context and are
  easier to scan separately from routine application logs.
- Avoid locking/rotation conflicts: some log rotation tools or OS-level file
  locking can behave differently for files written during a crash; a separate
  file avoids unexpected truncation or rotation interactions.
- Reliability: if the main logger transport (e.g., MongoDB) fails early during
  startup, the exception-handler file will still receive the crash record.

We register dedicated Winston exception/rejection handlers that write to
`uncaughtExeptions.log` and `unhandledRejections.log` so crash data is preserved
and easily distinguishable from normal logs.
