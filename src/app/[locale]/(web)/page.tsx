

import FeaturedRoom from "@/components/FeaturedRoom/FeaturedRoom";
import { Gallery } from "@/components/Gallery/Gallery";


import NewsLetter from "@/components/NewsLetter/NewsLetter";
import PageSearch from "@/components/PageSearch/PageSearch";
import { getFeaturedRoom, getbg } from "@/libs/apis";

import HeroTwo from "@/components/HeroTow/HeroTwo";
import LoadingSpinner from "./loading";
import ClientComponent from "@/components/HeroSection/ClientComponent";
import Image from "next/image";





export default  async function Home() {
  const featuredRoom = await getFeaturedRoom()
  // const fetch = await getbg()





  return (
    <>

  <div  className="relative mb-5 bg-opacity-20  ">
   <div className="absolute top-0 left-0 w-full h-full z-[-1]">
     <Image
   src="/custon.jpg"
   alt="Backround"
   layout="fill"
   objectFit="cover"
   quality={75}
   priority
   title="Hotel New Farah"
   
   
   />
   </div>
  


      
  
    <ClientComponent/>
          <PageSearch />
  </div>
        
        <FeaturedRoom featuredRoom={featuredRoom} />
        <Gallery />

        <NewsLetter />
    
        <HeroTwo/>
  


  </>
  );
}