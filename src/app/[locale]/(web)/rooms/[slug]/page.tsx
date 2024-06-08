"use client";
import { useState } from "react";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { MdOutlineBathroom, MdOutlineCleaningServices } from "react-icons/md";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoTvSharp } from "react-icons/io5";
import { getRoom } from "@/libs/apis";
import HotelPhotoGallery from "@/components/HotelPhotoGallery/HotelPhotoGallery";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { faBed, faWifi, faCity } from '@fortawesome/free-solid-svg-icons';


const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;


  const locale = useLocale()
  const t = useTranslations("pageRoom")
  const d = useTranslations('FeaturedRoom')


  const fetchRoom = async (url: string) => getRoom(slug);
  const { data: room, error, isLoading } = useSWR(`/api/room/${slug}`, fetchRoom);


  if (!room) return <LoadingSpinner />;

  const discountPrice = room.price - (room.price * room.discount / 100);



  return (
    <div className="mt-20">
      <HotelPhotoGallery photos={room.images} />
      <div className="container mx-auto mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-8 md:w-full">
            <div>
              <h2 className="font-bold text-left text-lg md:text-2xl text-tertiary-dark">
                {locale == "en" ? room.name.en : room.name.fr} <span className="text-black">({room.dimension})</span>
              </h2>
              <div className="flex my-11">
              {room.offeredAmenities.map(amenity => (
  <div
    key={amenity._key}
    className='md:w-44 w-fit text-center  px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center'
  >
    <div className="flex justify-center items-center">
          {amenity.icon === 'fa-bed' && <FontAwesomeIcon icon={faBed} className="md:text-2xl" />}
    {amenity.icon === 'fa-wifi' && <FontAwesomeIcon icon={faWifi} className="md:text-2xl" />}
    {amenity.icon === 'fa-city' && <FontAwesomeIcon icon={faCity} className="md:text-2xl" />}
    </div>

    {/* Add more conditions for other dynamic icons */}
    <p className='text-xs md:text-base pt-3'>
      {amenity.amenity}
    </p>
  </div>
))}
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Description</h2>
                <p>{locale == "en" ? room.description.en : room.description.fr}</p>
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">{t("amenities")}</h2>
                <div className="grid grid-cols-2">
                {room.offeredAmenities.map(amenity => (
                    <div
                      key={amenity._key}
                      className='flex items-center md:my-1 my-1 '
                    >
                          {amenity.icon === 'fa-bed' && <FontAwesomeIcon icon={faBed} className="md:text-2xl" />}
    {amenity.icon === 'fa-wifi' && <FontAwesomeIcon icon={faWifi} className="md:text-2xl" />}
    {amenity.icon === 'fa-city' && <FontAwesomeIcon icon={faCity} className="md:text-2xl" />}
                      <p className='text-xs md:text-base ml-2'>
                        {amenity.amenity}
                      </p>
                    </div>
                  ))}        </div>
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">{t("safety")}</h2>
                <div className="grid grid-cols-2">
                  <div className="flex items-center my-1 md:my-0">
                    <MdOutlineCleaningServices />
                    <p className="ml-2 md:text-base text-xs">{t("cleaning")}</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <LiaFireExtinguisherSolid />
                    <p className="ml-2 md:text-base text-xs">
                    {t("fire")}
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <AiOutlineMedicineBox />
                    <p className="ml-2 md:text-base text-xs">
                    {t("disinfections")}
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <GiSmokeBomb />
                    <p className="ml-2 md:text-base text-xs">{t("smoke")}</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <IoTvSharp />
                    <p className="ml-2 md:text-base text-xs">{t("TV")}</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <TbAirConditioning />
                    <p className="ml-2 md:text-base text-xs">{t("air")}</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <MdOutlineBathroom />
                    <p className="ml-2 md:text-base text-xs">{t("bathroom")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow-lg dark:shadow-white sticky top-10 h-fit overflow-auto">
          <div className='px-7 py-6'>
   <h1 className="text-tertiary-dark font-semibold md:text-2xl text-xl ">
 
     
   <span className="text-black px-4">{d('from')} 
    </span> $ {room.price}
   
   </h1>
   <div className='w-full border-b-2 border-b-tertiary-dark my-2' />
   <h4 className='my-8'>{room.specialNote}</h4>
   <button
     
      className='btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed'
    >
    <Link  href='https://www.booking.com/Share-CH6L7A' target="_blank">
    Reserve in Booking </Link> 
    </button>
   </div>
  
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
