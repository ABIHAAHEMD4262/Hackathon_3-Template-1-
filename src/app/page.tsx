import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Fonts from "@/components/ui/fonts";
import Products from "./products/page";



export default function Home() {
  return (
   <div>
  <AnnouncementBar/>
  <Header/>
  <Hero/>
  <Fonts/>
  <Products/>
   </div>
  );
}
