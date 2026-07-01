"use client";
import Navbar from "./navbar";
import Hero from "./components/hero";
import AboutBhutan from './components/about';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <AboutBhutan />
    </main>
  );
}
