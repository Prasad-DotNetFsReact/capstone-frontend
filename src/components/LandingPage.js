import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUber, FaBiking, FaConciergeBell } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../components/css/LandingPage.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from './pages/Footer';

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">One8 Food Delivery Services</div>
        <div className="login-button">
          <Link to="/login" className="btn">Signin</Link>
          <Link to="/signup" className="btn">Signup</Link>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-text" data-aos="fade-up">
          <h1>Get Your Favorite Food Delivered Fast!</h1>
          <p>Choose from the best restaurants in your area, and we'll bring it to you fresh.</p>
          <Link to="/login" className="btn hero-btn">Order Now</Link>
        </div>
        <div className="hero-transparent-image" data-aos="fade-left">
          <img src="https://img.freepik.com/free-psd/delicous-asian-food-social-media-template_505751-2981.jpg" alt="Transparent Food Image" className="transparent-image" />
        </div>
      </section>

      {/* Image Slider */}
      <section className="slider-section" data-aos="fade-up">
        <h2>Popular Restaurants</h2>
        <Carousel
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          showStatus={false}
          dynamicHeight={true}
        >
          <div>
            <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg" alt="Restaurant 1" />
            <p className="legend">Restaurant 1</p>
          </div>
          <div>
            <img src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" alt="Restaurant 2" />
            <p className="legend">Restaurant 2</p>
          </div>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFb-QOETAw_2smnhPtCqsh8A1KTeBnpYEBTQ&s" alt="Restaurant 3" />
            <p className="legend">Restaurant 3</p>
          </div>

          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4UNCNd9lVM-WXtr4iulm4NZzCs5I1qz6qWA&s" alt="Restaurant 3" />
            <p className="legend">Restaurant 4</p>
          </div>
          <div>
            <img src="https://clubmahindra.gumlet.io/blog/media/section_images/food-deskt-8d09284f3d04528.jpg?w=360&dpr=2.6" alt="Restaurant 3" />
            <p className="legend">Restaurant 5</p>
          </div>
          <div>
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0xZHE7yx3Ns0DXdt_6FjQItaZeFsZGlDJeEzHyrX7n3UH_c104aeKOT5bzoMpRZ1ihzp1EXuPREpD8Ffvh4vTXVVLm6BZG8V88KZwzcytqn8etL4qW35h19Nd17ThLZd-DPU77I-GMmQW/w1200-h630-p-k-no-nu/IMG_20170502_153702.jpg" alt="Restaurant 3" />
            <p className="legend">Restaurant 6</p>
          </div>
          <div>
            <img src="https://images.squarespace-cdn.com/content/v1/5c6df920d74562c46b234f9e/1587328559523-PYF98SA927T33OA7IUFF/IMG_2906.jpg" alt="Restaurant 3" />
            <p className="legend">Restaurant 7</p>
          </div>
          <div>
            <img src="https://floweraura-blog-img.s3.ap-south-1.amazonaws.com/cake-blog-23/chole-bhature-famous-food-of-delhi.jpg" alt="Restaurant 3" />
            <p className="legend">Restaurant 8</p>
          </div>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYMzpHpy95I_7oZWoK7OfxRO54OiPurcvLtQ&s" alt="Restaurant 3" />
            <p className="legend">Restaurant 9</p>
          </div>
          <div>
            <img src="https://hogr.app/blog/wp-content/uploads/2022/10/GoatBiryani-scaled-1-1024x749.webp" alt="Restaurant 3" />
            <p className="legend">Restaurant 10</p>
          </div>
        </Carousel>
      </section>

      <section className="how-it-works" data-aos="fade-up">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <h3>1. Browse Restaurants</h3>
            <p>Choose from a variety of local restaurants.</p>
          </div>
          <div className="step">
            <h3>2. Select Your Meal</h3>
            <p>Pick your favorite dish from the menu.</p>
          </div>
          <div className="step">
            <h3>3. Place Your Order</h3>
            <p>Place the order with a few clicks.</p>
          </div>
          <div className="step">
            <h3>4. Enjoy Your Meal</h3>
            <p>Get your meal delivered right to your doorstep!</p>
          </div>
        </div>
      </section>
      <section className="services" data-aos="fade-up">
        <h2>Our Delivery Partners</h2>
        <div className="icons">
          <FaUber className="service-icon" />
          <FaBiking className="service-icon" />
          <FaConciergeBell className="service-icon" />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
