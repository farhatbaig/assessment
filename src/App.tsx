import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostPage from "./pages/PostPage";
import Navbar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
