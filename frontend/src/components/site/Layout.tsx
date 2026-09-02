import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageTransition } from "@/components/site/PageTransition";
import { Loader } from "@/components/site/Loader";

export const Layout = () => {
  const [booted, setBooted] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("iic-booted") === "1";
  });

  useEffect(() => {
    if (booted) document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [booted]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!booted && (
        <Loader
          onDone={() => {
            sessionStorage.setItem("iic-booted", "1");
            setBooted(true);
          }}
        />
      )}
      <Navbar />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};
