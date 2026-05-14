import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  });

  // input handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // submit handler
  const handleSubmit = (e) => {
  e.preventDefault();

  const SERVICE_ID = "service_i7rjs38";
  const TEMPLATE_ID = "template_hmi49bi";
  const PUBLIC_KEY = "iiLs0XNUyIOi2AgWJ";

  emailjs
    .send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
    .then(() => {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully",
        icon: "success",
        confirmButtonColor: "#0095FF",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
      });
    })
    .catch((error) => {
      console.log(error);

      Swal.fire({
        title: "Error!",
        text: "Failed to send message",
        icon: "error",
      });
    });
};

  return (
    <section className="bg-[#010d18] py-20 px-6 flex justify-center items-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#010d18] border border-gray-800 p-10 rounded-3xl relative overflow-hidden shadow-2xl">

        {/* glow */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#0095FF] opacity-20 blur-[80px]"></div>

        {/* LEFT SIDE */}
        <div className="z-10">
          <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight mb-10">
            Get Ready To <br /> Create Great
          </h1>

          <div className="space-y-8">
            <div className="flex items-center gap-5">
              <Mail className="text-white" />
              <div>
                <p className="text-gray-400 text-sm">E-mail:</p>
                <p className="text-white">example@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <MapPin className="text-white" />
              <div>
                <p className="text-gray-400 text-sm">Location:</p>
                <p className="text-white">Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <Phone className="text-white" />
              <div>
                <p className="text-gray-400 text-sm">Contact:</p>
                <p className="text-white">0123456789</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="z-10">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="bg-[#021324] border border-gray-800 text-white p-4 rounded-xl outline-none"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="bg-[#021324] border border-gray-800 text-white p-4 rounded-xl outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="bg-[#021324] border border-gray-800 text-white p-4 rounded-xl outline-none"
              />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="bg-[#021324] border border-gray-800 text-white p-4 rounded-xl outline-none"
              />
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full bg-[#021324] border border-gray-800 text-white p-4 rounded-xl outline-none"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#0095FF] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2"
            >
              Send Message <ArrowRight size={20} />
            </motion.button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;