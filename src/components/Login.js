import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import authService from '../components/services/authService';
import { jwtDecode } from 'jwt-decode';
import '../components/css/Login.css'; 

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const tokenResponse = await authService.login(values.username, values.password);

        if (!tokenResponse) {
          setErrors({ username: 'Failed to retrieve the token.' });
          return;
        }

        const decodedToken = jwtDecode(tokenResponse.token);
        console.log('Decoded Token:', decodedToken);

        const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        console.log('User Role:', userRole);

        localStorage.setItem('token', tokenResponse.token);
        setIsLoggedIn(true);

        if (userRole === 'Admin') {
          navigate('/admin-dashboard');
          alert("Welcome to Admin Dashboard")
        } else if (userRole === 'Customer') {
          navigate('/customer-dashboard');
          alert("Welcome to Customer Dashboard")
        } 
        else if (userRole === 'deliveryPartner') {
          navigate('/deliverypartner-dashboard');
          alert("Welcome to Delivery Partner Dashboard")
        }
        else {
          setErrors({ username: 'You do not have access to the required dashboard.' });
        }
      } catch (error) {
        console.error('Login Error:', error);
        setErrors({ username: 'Invalid username or password.' });
      } finally {
        setSubmitting(false);
      }
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
    alert("Logged Out Successfully")
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            {/* <label>UserName</label> */}
            <input
              type="text"
              className="form-control"
              placeholder='Username'
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-danger">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="form-group mb-3">
            {/* <label>Password</label> */}
            <input
              type="password"
              placeholder='Password'
              className="form-control"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          {formik.errors.username && <div className="alert alert-danger mt-2">{formik.errors.username}</div>}
          <button type="submit" className="btn-custom" disabled={formik.isSubmitting}>Login</button>
        </form>

        <div className="mt-3 text-center">
          <p>Don't have an account? <button className="btn btn-link" onClick={() => navigate('/signup')}>Create Account</button></p>
        </div>

        {isLoggedIn && (
          <div className="mt-4 text-center">
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;








