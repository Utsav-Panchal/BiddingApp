// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ProductList from './pages/ProductList';
// import AdminDashboard from './pages/AdminDashboard';

// export default function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/" element={<ProductList />} />
//       </Routes>
//     </Router>
//   );
// }


import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Routes from './routes/Routes';
import './styles/global.css';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
