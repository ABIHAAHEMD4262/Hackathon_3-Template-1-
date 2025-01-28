import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewArrival from "@/components/NewArrival";
import TopSelling from "@/components/TopSelling";
import Fonts from "@/components/ui/fonts";




export default function Home() {
  return (
   <div>
  <AnnouncementBar/>
  <Header/>
  <Hero/>
  <Fonts/>
  <NewArrival/>
  <TopSelling/>
   </div>
  );
}
