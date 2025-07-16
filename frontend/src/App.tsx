import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store';
// import ProtectedRoute from './components/common/ProtectedRoute';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import Dashboard from './components/dashboard/Dashboard';
// import ProjectDetails from './components/projects/ProjectDetails';
// import Layout from './components/layout/Layout';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        {/* <div className="min-h-screen bg-gray-50">
          <Routes>
   
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
         
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects/:id" element={<ProjectDetails />} />
            </Route>
            
    
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div> */}
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
          className="mt-16"
        />
      </Router>
    </Provider>
  );
};

export default App;