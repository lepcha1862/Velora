"use client";

import Image from "next/image";
import Navbar from "./navbar";
import Hero from "./components/hero";
import AboutBhutan from './components/about';
import WhyChooseUs from './components/why_choose_us';
import CultureSection from './components/culture';
import ExperiencesSection from './components/experience';
//import BlogSection from './components/blog';
import ContactFooter from './components/contact';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar
        agencyName="Velora"   // 👈 new agency name
        logo={
          <Image
            src="/logo.png"   // file in /public
            alt="Velora Logo"
            width={80}               // required
            height={80}              // required
            priority                 // optional: improves LCP
          />
        } // 👈 custom logo
      />
      <Hero />
      <WhyChooseUs />
      <AboutBhutan />
      <CultureSection />
      <ExperiencesSection />
      {/* <BlogSection /> */}
      <ContactFooter agencyName="Velora"   // 👈 new agency name
        logo={
          <Image
            src="/logo.png"   // file in /public
            alt="Velora Logo"
            width={80}               // required
            height={80}              // required
            priority                 // optional: improves LCP
          />
        }/>
    </main>
  );
}
