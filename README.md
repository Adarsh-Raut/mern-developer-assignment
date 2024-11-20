# MERN Stack Project Setup

This is a MERN stack project using React with Vite, React Flow, Express, Nodemailer, and Agenda.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14+)
- **MongoDB**
- **npm** or **yarn**

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Adarsh-Raut/mern-developer-assignment.git
cd mern-developer-assignment
```

### Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

---

## Configuration

### Backend

Create a `.env` file in the `server` directory with the following:

```env
MONGO_DB_URL=mongodb://localhost:27017/your-database-name
```

Update the placeholders with your values.

## Running the Application

### Backend

Start the server:

```bash
cd server
npm run dev
```

### Frontend

Start the frontend:

```bash
cd client
npm run dev
```

### Access the Application

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8000](http://localhost:8000)

---



---

That's it! Your project is now set up.