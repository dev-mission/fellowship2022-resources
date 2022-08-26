import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';

import { AuthContextProvider, AuthProtected } from './AuthContext';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import MissionPage from './MissionPage';
import NavigationPage from './NavigationPage';
import DetailPage from './DetailPage';
import CategoryForm from './CategoryForm.js';
import Login from './Login';
import PasswordRoutes from './Passwords/PasswordRoutes';
import Register from './Register';
import UserRoutes from './Users/UserRoutes';
import ResourceForm from './ResourceForm';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route
            path="/categories/new"
            element={
              <AuthProtected isAdminRequired={true}>
                <CategoryForm />
              </AuthProtected>
            }
          />
          <Route
            path="/categories/:id/edit"
            element={
              <AuthProtected isAdminRequired={true}>
                <CategoryForm />
              </AuthProtected>
            }
          />
          <Route
            path="/resources/new"
            element={
              <AuthProtected isAdminRequired={true}>
                <ResourceForm />
              </AuthProtected>
            }
          />
          <Route
            path="/resources/:id/edit"
            element={
              <AuthProtected isAdminRequired={true}>
                <ResourceForm />
              </AuthProtected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/passwords/*" element={<PasswordRoutes />} />
          {process.env.REACT_APP_FEATURE_REGISTRATION === 'true' && <Route path="/register" element={<Register />} />}
          <Route
            path="/account/*"
            element={
              <AuthProtected>
                <UserRoutes />
              </AuthProtected>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
