import Image from "next/image";
import "@/styles/home.css";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="content-layout">
      <Hero />
    </div>
  );
}
