
import type { Metadata } from "next";

import "./globals.css";
import { Poppins } from 'next/font/google';

import 'aos/dist/aos.css';
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import Toast from "@/components/Tosat/Toast";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {NextIntlClientProvider, useLocale} from 'next-intl';
import { getMessages } from "next-intl/server";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata: Metadata = {
  title: 'NEW FARAH HÔTEL',
  description: 'New Farah offers great value with competitive pricing and a wide range of amenities. Enjoy top-quality service and affordable luxury. Experience comfort and convenience at New Farah today.. ',
  keywords:["New Farah Hotel",
    "New Farah ",
    "New Farah",
    "hotel new farah agadir", 
    "new farah hotel agadir",
    "hotel new farah agadir	",
    "new farah hotel",
    "new farah hotel agadir	",
    "new farah hotel agadir morocco	",
    "best hotel",
    "hotel farah",
    "agadir maps",
    "hotel agadir",
    "hotel agadir beach club",
    "hotel argana agadir",
    "hotel riu palace tikida agadir",
    "hotel sofitel agadir",
    "agadir hotel",
    "hotel agadir pas cher",
    "hotel pas cher agadir",
    "hotel pas chere agadir",
    "agadir morocco hotels",
    "hotel a agadir",
    "hotel senator agadir",
    "hotels pas chers agadir",
    "appart hotel agadir",
    "appart hotel à agadir",
    "hotel appart agadir",
    "hotel mirage agadir",
    "hotel oasis agadir",
    "tildi hotel agadir",
    "atlas amadil beach hotel agadir",
    "hotel kamal agadir",
    "kamal hotel agadir",
    "hotel ibis agadir",
    "ibis hotel agadir",
    "hotel flat agadir",
    "hotel mabrouk agadir",
    "hotel omega agadir",
    "hotel sahara agadir",
    "kenzi hotel agadir",
    "omega hotel agadir",
    "sahara hotel agadir",
    "al moggar hotel agadir",
    "atlas hotel agadir",
    "hotel agadir al moggar",
    "hotel agadir booking",
    "hotel agadir riu",
    "hotel al moggar agadir",
    "hotel atlas agadir",
    "hotel atlas amadil agadir",
    "hotel founty agadir",
    "hotel founty beach agadir",
    "hotel riu agadir",
    "hotel royal atlas agadir",
    "hotel sindibad agadir",
    "hotel zephyr agadir",
    "moggar hotel agadir",
    "reservation hotel agadir",
    "agadir beach club hotel",
    "agadir hotels",
    "atlantic hotel agadir",
    "hotel 5 etoiles agadir",
    "hotel agadir 5 étoiles",
    "hotel agyad agadir",
    "hotel anezi tower agadir",
    "hotel intouriste agadir",
    "hotel residence rihab agadir",
    "hotel rihab agadir",
    "hotel robinson agadir",
    "hotel tildi agadir",
    "rihab hotel agadir",
    "agadir all inclusive hotels",
    "almogar hotel agadir",
    "argana hotel agadir",
    "hotel aferni agadir",
    "hotel agadir all inclusive",
    "hotel amadil agadir",
    "hotel iberostar agadir",
    "hotel tafoukt agadir",
    "hotel tikida beach agadir",
    "new farah hotel agadir",
    "new farah hotel agadir morocco",
    "oasis hotel agadir",
    "bahia hotel agadir",
    "booking hotel agadir",
    "decameron hotel agadir",
    "hotel 2 etoiles agadir",
    "hotel allegro agadir",
    "hotel anezi agadir",
    "hotel bahia agadir",
    "hotel decameron agadir",
    "hotel hamilton agadir",
    "hotel ibis budget agadir",
    "hotel kenzi agadir",
    "hotel kenzi europa agadir",
    "hotel khalij agadir",
    "la suite hotel agadir",
    "atlantic palace casino & resort agadir hotels",
    "atlantic palace hotel agadir",
    "hotel 4 etoiles agadir",
    "hotel agadir 4 étoiles",
    "hotel beach club agadir",
    "hotel borj agadir",
    "hotel odyssee park agadir",
    "hotel tilila agadir",
    "mabrouk hotel agadir",
    "odyssee park hotel agadir",
    "riu hotel agadir",
    "agadir hotel booking",
    "bo hotel & spa agadir",
    "bo hotel agadir",


  ],
  icons:{
    icon:['/favicon.ico?v=1'],
    apple:['/apple-touch-icon.png?v=4'],
    shortcut:['/apple-touch-icon.png']

  },
  authors:[{name:"Hotel New Farah"}],
  creator:"Hotel New Farah",
  publisher:"Hotel New Farah",
  openGraph: {
    title: 'Hotel New Farah',
    description: 'New Farah offers great value with competitive pricing and a wide range of amenities. Enjoy top-quality service and affordable luxury. Experience comfort and convenience at New Farah today..',
    url: "https://hotel.vercel.app/",
    siteName: "Hotel ",
    type: "website",
  },
};
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['italic', 'normal'],
  variable: '--font-poppins',
});
export default  async function  RootLayout({
  children,  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {

  const messages = await getMessages();


  return (  
    <ClerkProvider>
    <html lang={locale} >
       <head>
    
         <meta property="og:title" content='NEW FARAH HÔTEL' />
        <meta property="og:description" content='Sindibad offers excellent value for money, with competitive prices and a wide range of amenities. The hotel is strategically located in the heart of Agadir, in the historic and touristy neighborhood of Talborjt. It is surrounded by two large squares, a beautiful pedestrian street leading to the sea, ' />
            <meta name="robots" content="HOTEL, Sindibad, Sindibad, Hotel Sindibad, Hotel Agadir" />
        <meta property="og:url" content={'https://hotenewfarah.vercel.app/'} />
      </head>
      <body className={poppins.className}>
      <NextIntlClientProvider messages={messages}>
        
   
      <ThemeProvider>
      <Toast />
  

    <main className='font-normal 

 '>
     
      <Header  params={{
                  locale: locale
                }}/>  

        {children}
        <Footer/>   
       
  
           </main>
     
   
        </ThemeProvider>
        </NextIntlClientProvider>
        </body>
    </html> 
    </ClerkProvider>
  );
}