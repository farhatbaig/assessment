# React-Redux Data Table App 🚀

This project is a **React.js** application using **Redux Toolkit** for state management. It features **user** and **product management** with filtering, pagination, and navigation.

## 🛠️ Features
- 📦 **Products & Users Management** (Fetched via API)
- 🔍 **Search & Filter** (By title, brand, category, etc.)
- 📊 **Pagination** (Client-side pagination)
- 🔔 **Toast Notifications** (For success & errors)
- 🔄 **Reusable Data Table** (Dynamic and configurable)
- 🏗 **Modular Code Structure** (Constants, Types, Redux, Pages)
- 🌐 **React Router for Navigation**

---

## 🚀 Installation & Setup

### **Step 1: Clone the Repository**
```sh
git clone https://github.com/farhatbaig/assessment
cd assessment

npm install

npm start


📦 src
 ┣ 📂 components
 ┃ ┣ 📜 DataTable.tsx
 ┃ ┣ 📜 Navbar.tsx
 ┃ ┗ 📜 Toast.tsx
 ┣ 📂 features
 ┃ ┣ 📜 usersSlice.ts
 ┃ ┗ 📜 productsSlice.ts
 ┣ 📂 pages
 ┃ ┣ 📜 UsersPage.tsx
 ┃ ┗ 📜 ProductsPage.tsx
 ┣ 📂 types
 ┃ ┗ 📜 index.ts
 ┣ 📂 constants
 ┃ ┗ 📜 index.ts
 ┣ 📜 App.tsx
 ┣ 📜 store.ts
 ┗ 📜 index.tsx





