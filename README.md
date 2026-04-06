<<<<<<< HEAD
# wallet-payment-api

# 💳 Wallet Payment API (Paytm Clone Backend)
=======

# 💳 Wallet Payment API 
>>>>>>> bcac2012442acc117cfbe1a1a9cb8b516b896752

A backend system for a digital wallet application that allows users to register, authenticate, send money, and view transaction history — inspired by apps like Paytm.

---

## 🚀 Features

* 🔐 User Authentication (JWT-based)
* 👤 Signup & Login system
* 💰 Wallet balance management
* 💸 Send money between users
* 📜 Transaction history tracking
* 🔍 User search functionality
* 🛡️ Input validation using Zod
* ⚡ Atomic transactions using MongoDB sessions

---

## 🧠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JSON Web Tokens (JWT)
* **Validation:** Zod
* **Security:** bcrypt (password hashing)

---

## 📂 Project Structure

```
src/
  config/
  controllers/
  middleware/
  models/
  routes/
  validators/
  utils/
```

---

## 🔐 API Endpoints

### Auth

* `POST /api/auth/signup` → Register user
* `POST /api/auth/login` → Login user

---

### User

* `GET /api/user/me` → Get profile
* `GET /api/user/search?query=` → Search users
* `PUT /api/user/profile` → Update profile

---

### Transactions

* `POST /api/transaction/send` → Send money
* `GET /api/transaction/history` → Get transaction history

---

## ⚙️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/your-username/wallet-payment-api.git

# Go to project folder
cd wallet-payment-api

# Install dependencies
npm install

# Create .env file
touch .env
```

---

## 🔑 Environment Variables

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Run the Server

```bash
npm run dev
```

---

## 🧪 Testing

Use Postman or Thunder Client to test APIs.

---

## 🔥 Key Learning Highlights

* Designed RESTful APIs
* Implemented JWT authentication middleware
* Used MongoDB transactions for safe money transfer
* Applied clean architecture (middleware → controller → service → DB)

---

## 👨‍💻 Author

**Mitesh**

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub!
