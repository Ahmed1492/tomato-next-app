"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Features from "@/components/Features";
import ExploreMenu from "@/components/ExploreMenu";
import ClientFoodDisplay from "@/components/ClientFoodDisplay";
import Testimonials from "@/components/Testimonials";
import MobileApp from "@/components/MobileApp";
import Footer from "@/components/Footer";
import LoginPop from "@/components/LoginPop";

export default function HomeClient({ initialFoods }) {
  const [category, setCategory] = useState("All");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Navbar setIsLogin={setIsLogin} />
      {isLogin && <LoginPop setIsLogin={setIsLogin} />}
      
      {/* Hero Section */}
      <div className="px-[8%] pt-24">
        <Header />
      </div>

      {/* Features Section */}
      <Features />

      {/* Menu Section */}
      <div className="px-[8%] py-12">
        <ExploreMenu category={category} setCategory={setCategory} />
        <ClientFoodDisplay foods={initialFoods} category={category} />
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Mobile App Section */}
      <div className="px-[8%] py-12">
        <MobileApp />
      </div>

      <Footer />
    </>
  );
}