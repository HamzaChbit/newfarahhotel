'use client';




import Link from 'next/link'
import { FaMapMarkerAlt, FaPhone} from 'react-icons/fa';
import LocalSwitcher from '../LocalSwitcher/local-switcher';
import {  useTranslations } from 'next-intl';
import { AnimatePresence, motion,useScroll } from "framer-motion";
import { useState } from 'react';
import { IoCloseOutline, IoMenuSharp } from 'react-icons/io5';




const Header = ({
  params: {locale}
}: Readonly<{

params: {locale: string};
}>) => {


  const t = useTranslations('Navigation');

  const {scrollYProgress}=useScroll()
 
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };


  return (

<>

<motion.div  style={{scaleX: scrollYProgress ,position:"fixed",top:0,right:0,height:10,left:0,background:"#016de4",zIndex:10 ,transformOrigin:"0%"}}>
</motion.div>

    <header className=' text-md  w-full  text-white  ' >
   
 <div className='hidden md:block' > 
      <div className='flex  items-center bg-tertiary-dark px-1 py-6'>
        <div className='flex flex-row  items-centre justify-around w-full'>
         
              <div className='flex flex-row items-center gap-x-2 rounded-2xl '> 
          <FaMapMarkerAlt />
          <h1>Rue de la foire,Agadir  </h1>
          </div>
         
        
          {/* <div className='flex flex-row items-center gap-x-2'>      
             <FaPhone />
             <h1>0528380606</h1>
          </div> */}
          <div className=' '>  
          <LocalSwitcher />
          </div>
         
        </div>
        </div>

      </div>
      
      <div className=' px-5 flex flex-row items-center justify-between h-20 text-slate-700 py-2 text-xl drop-shadow-2x'>

      <div  className='flex items-center w-full md:2/3' >
      <Link href="/" className='md:font-black font-semibold text-tertiary-dark ' >
        hOTEL
      </Link>
   
      <div className='hidden md:block' > 
      <ul className='flex items-center ml-5' >
   
    
      </ul>
      </div>
    </div>
 
    <div className='hidden md:block' > 
    <ul  className='flex items-center justify-between w-full md:w-1/3  mt-4 text-current font-semibold' >
        <li className='hover:-translate-y-2 duration-500 transition-all hover:text-tertiary-dark  text-current px-2'>
        <Link href={`/`} title='Home'   >{t("home")}</Link>
          </li>
          <li className='hover:-translate-y-2 duration-500 transition-all px-2 hover:text-tertiary-dark text-current'>
          <Link href={`/${locale}/rooms`}  title="Rooms"  >{t("rooms")}</Link>
        </li>
        <li className='hover:-translate-y-2 duration-500 transition-all px-2 hover:text-tertiary-dark text-current'>
          <Link href={`/${locale}/contact`}   title="Contact"  >Contact</Link>
        </li>
      
        </ul>
        </div>



        <div
          className="cursor-pointer  text-md text-black block md:hidden hover:text-blue-600"
          onClick={toggleMenu} 
        >
      <IoMenuSharp size={30} />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top bg-white text-black p-10 z-40"
          >
            <div className="flex h-full flex-col w-full it">
              <div className="flex justify-between">
  

                <p
                  className="cursor-pointer text-md text-black hover:text-blue-600"
                  onClick={toggleMenu}
                >
                 <IoCloseOutline size={30} />
                </p>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col items-center py-5 my-6  font-lora  gap-y-6   "
              >










<div>
   <ul  className='flex  flex-col gap-y-5 text-2xl font-medium ' >
           
        <li className='hover:-translate-y-2 duration-500 transition-all hover:text-tertiary-dark  text-current px-2'>
        <Link href={`/`} title='Home'   onClick={toggleMenu} >{t("home")}</Link>
          </li>
          <li className='hover:-translate-y-2 duration-500 transition-all px-2 hover:text-tertiary-dark text-current'>
          <Link href={`/${locale}/rooms`}   onClick={toggleMenu}  title="Rooms">{t("rooms")}</Link>
        </li>
        <li className='hover:-translate-y-2 duration-500 transition-all px-2 hover:text-tertiary-dark text-current'>
          <Link href={`/${locale}/contact`}   onClick={toggleMenu}   title="Contact">Contact</Link>
        </li>
      
        </ul>

</div>
     
        <div className='flex   px-1 py-5 justify-around gap-y-5 flex-col'>
       
         
              <div className='flex flex-row items-center gap-x-2 rounded-2xl '> 
          <FaMapMarkerAlt />
          <h1>Rue de la foire,Agadir  </h1>
          </div>
         
        
          <div className='flex flex-row items-center   gap-x-2'>      
             <FaPhone />
             <h1>0528380606</h1>
          </div>
       
        </div>

     
          <LocalSwitcher />
   
    

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>



    </header>
    </>
  )
}

export default Header