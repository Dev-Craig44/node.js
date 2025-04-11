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
