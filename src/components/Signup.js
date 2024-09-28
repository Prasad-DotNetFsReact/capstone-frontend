import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import authService from '../components/services/authService';
import '../components/css/Login.css'; 

const SignUp = () => {
  const navigate = useNavigate();
  const [isSignedUp, setIsSignedUp] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await authService.register({
          username: values.username,
          email: values.email,
          password: values.password,
        });

        if (!response) {
          setErrors({ username: 'Failed to sign up.' });
          return;
        }

        setIsSignedUp(true);
        navigate('/login');
        alert("Sign-up successful! Please log in.");
      } catch (error) {
        console.error('SignUp Error:', error);
        setErrors({ username: 'Sign-up failed. Try again.' });
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="login-background">
      <div className="login-card">
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
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
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
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
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-danger">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          {formik.errors.username && <div className="alert alert-danger mt-2">{formik.errors.username}</div>}
          <button type="submit" className="btn-custom" disabled={formik.isSubmitting}>Sign Up</button>
        </form>

        <div className="mt-3 text-center">
          <p>Already have an account? <button className="btn btn-link" onClick={() => navigate('/login')}>Login</button></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
