import React, { useContext } from 'react';
import { assets, testimonialsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';

function Testimonials() {
  const navigate = useNavigate();
  const { user, setShowLogin } = useContext(AppContext);

  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center md:text-left my-24 p-6 md:px-28 bg-[#fefaf5] rounded-2xl"
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="w-full md:w-3/4 text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold">Customer Testimonials</h1>
        <p className="text-gray-500 mb-12">What Our Users Are Saying</p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img src={testimonial.image} className="rounded-full w-16" alt="User" />
              <h2 className="font-semibold">{testimonial.name}</h2>
              <p className="text-sm text-gray-600">{testimonial.role}</p>

              <div className="flex">
                {Array(testimonial.stars).fill().map((_, i) => (
                  <img key={i} src={assets.rating_star} alt="Star" className="w-5" />
                ))}
              </div>

              <p className="text-sm text-gray-700">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-3xl sm:text-4xl font-semibold mt-10">See the magic, Try now!</h1>
        <button
          onClick={onClickHandler}
          className="bg-black text-white px-8 py-2 rounded-full hover:scale-105 transition-transform duration-300 flex justify-center  ml-22 mt-6 items-center gap-2"
        >
          Generate Images
          <img className="h-6" src={assets.star_group} alt="" />
        </button>
      </div>
    </motion.div>
  );
}

export default Testimonials;
