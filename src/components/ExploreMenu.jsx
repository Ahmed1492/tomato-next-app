"use client";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useStore();

  return (
    <div id="explore-menu" className="mt-[3rem] fadeInUp">
      <div className="flex flex-col gap-6 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text">Explore our menu</h2>
        <p className="max-w-2xl font-medium text-gray-600 text-base md:text-lg mx-auto md:mx-0">
          Choose from a diverse menu featuring a delectable array of dishes. Our mission is to
          satisfy your cravings and elevate your dining experience, one delicious meal at a time.
        </p>
      </div>
      <div className="flex gap-6 justify-between mt-12 overflow-x-auto hide-scrollbar px-2 pb-4">
        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;
          return (
            <div
              key={index}
              onClick={() => setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))}
              className={`flex flex-col shrink-0 items-center gap-3 cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                isActive ? "scale-110" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative group">
                <Image
                  src={item.menu_image}
                  alt={item.menu_name}
                  width={112}
                  height={112}
                  className={`w-24 lg:w-28 rounded-full border-4 transition-all duration-300 ${
                    isActive
                      ? "border-[#ff6b6b] shadow-[0_0_25px_rgba(255,107,107,0.6)] scale-110"
                      : "border-gray-200 group-hover:border-[#ff6b6b] group-hover:shadow-[0_0_20px_rgba(255,107,107,0.4)]"
                  }`}
                />
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff6b6b]/20 to-transparent animate-pulse"></div>
                )}
              </div>
              <p
                className={`text-sm font-semibold transition-all duration-300 ${
                  isActive ? "text-[#ff6b6b] scale-110" : "text-gray-700 group-hover:text-[#ff6b6b]"
                }`}
              >
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="my-[2rem] bg-gradient-to-r from-transparent via-gray-300 to-transparent h-[2px] border-none" />
    </div>
  );
};

export default ExploreMenu;
