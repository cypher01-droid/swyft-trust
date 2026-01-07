
import { useState } from 'react'
import '../App.css'
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import Partners from "../Components/Partners";
import AboutUs from "../Components/AboutUs";
import Reviews from "../Components/Reviews";
import FAQ from "../Components/FAQ";
import CTA from "../Components/CTA";
import Footer from "../Components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Partners />
        <Features />
        <AboutUs />
        <Reviews />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
