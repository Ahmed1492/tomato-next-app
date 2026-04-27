"use client";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginPop from "@/components/LoginPop";
import PageSkeleton from "@/components/skeletons/PageSkeleton";
import OrderHistoryPanel from "@/components/OrderHistoryPanel";

export default function MyOrders() {
  const { token } = useContext(StoreContext);
  const [mounted, setMounted] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <PageSkeleton type="orders" />;

  if (!token) {
    return (
      <>
        <Navbar setIsLogin={setIsLogin} />
        {isLogin && <LoginPop setIsLogin={setIsLogin} />}
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-24 px-4">
          <div className="text-center p-10 bg-white rounded-3xl shadow-2xl max-w-md w-full fadeInUp">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] rounded-full flex items-center justify-center shadow-xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Sign In Required</h2>
            <p className="text-gray-500 mb-8">Please sign in to view your order history</p>
            <button onClick={() => setIsLogin(true)} className="btn-primary text-white font-semibold px-8 py-3 rounded-full w-full">
              Sign In Now
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar setIsLogin={setIsLogin} />
      {isLogin && <LoginPop setIsLogin={setIsLogin} />}

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Page header */}
          <div className="mb-10 fadeInUp">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-800">My Orders</h1>
                <p className="text-gray-500 text-sm">Track, reorder, and manage your deliveries</p>
              </div>
            </div>
          </div>

          <OrderHistoryPanel />
        </div>
      </div>

      <Footer />
    </>
  );
}
