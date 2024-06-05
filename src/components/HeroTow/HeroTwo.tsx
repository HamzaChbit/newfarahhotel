import Image from 'next/image'
import React from 'react'


const HeroTwo = () => {
  return (
    <section>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 " data-aos="fade-up">
   
  
      <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <li data-aos="fade-up">
          <div  className="group relative block">
          <Image width={400} height={400}
              src="/images/12.jpg"
              alt="image"
              className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
            />
  
    
          </div>
        </li>
  
        <li data-aos="fade-up">
          <div  className="group relative block">
          <Image width={400} height={400}
                  src="/images/11.png"
              alt="ddd"
              className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
            />
  
         
          </div>
        </li>
  
        <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1" data-aos="fade-up">
          <div  className="group relative block">
            <Image
            width={1200} height={1200}
                     src="/images/3.jpg"
              alt="ddd"
              className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
            />
  
  
          </div>
        </li>
      </ul>
    </div>
  </section>
  )
}

export default HeroTwo