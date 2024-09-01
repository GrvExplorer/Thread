import Footer from "@/components/shared/landing/Footer";
import Hero from "@/components/shared/landing/Hero";
import Navbar from "@/components/shared/landing/Navbar";

export default function Home() {
  return (
    <main className="grid max-w-[1024px] px-8 lg:px-0 mx-auto h-screen grid-rows-[auto_1fr_auto]">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
