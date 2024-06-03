"use client";
import { useState } from "react";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { MdOutlineBathroom, MdOutlineCleaningServices } from "react-icons/md";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import toast from "react-hot-toast";
import axios from "axios";
import { IoTvSharp } from "react-icons/io5";
import { useUser } from "@clerk/nextjs";
import { getRoom } from "@/libs/apis";
import BookRoomCta from "@/components/BookRoomCta/BookRoomCta";
import HotelPhotoGallery from "@/components/HotelPhotoGallery/HotelPhotoGallery";
import { useLocale, useTranslations } from "next-intl";

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const { user } = useUser();
  const locale = useLocale()
  const t = useTranslations("pageRoom")
  const userId = user?.fullName;
  const email = user?.emailAddresses[0]?.emailAddress;

  const fetchRoom = async (url: string) => getRoom(slug);
  const { data: room, error, isLoading } = useSWR(`/api/room/${slug}`, fetchRoom);

  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [telephone, setTelephone] = useState("");
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);

  if (error) throw new Error("Cannot fetch data");
  if (!room) return <LoadingSpinner />;

  const calcMinCheckoutDate = () => {
    if (checkinDate) {
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return null;
  };

  const handleBookNowClick = async () => {
    if (!checkinDate || !checkoutDate)
      return toast.error("Please provide checkin / checkout date");

    if (checkinDate > checkoutDate)
      return toast.error("Please choose a valid checkin period");

    if (!/^\d{8,15}$/.test(telephone))
      return toast.error("Please enter a valid telephone number");

    const numberOfDays = calcNumDays();

    const hotelRoomSlug = room.slug.current;

    try {
      await axios.post("/api/stripe", {
        checkinDate,
        checkoutDate,
        adults,
        children: noOfChildren,
        numberOfDays,
        telephone,
        hotelRoomSlug,
        email,
        user: userId,
        userId: user?.id,
      });
      toast.success("Booking successful");
      setCheckinDate(null);
      setCheckoutDate(null);
      setTelephone("");
      setAdults(1);
      setNoOfChildren(0);
    } catch (error) {
      console.log("Error: ", error);
      toast.error("You must register an account");
    }
  };

  const calcNumDays = () => {
    if (!checkinDate || !checkoutDate) return;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

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
                {room.offeredAmenities.map((amenity) => (
                  <div
                    key={amenity._key}
                    className="md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center"
                  >
                    <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                    <p className="text-xs md:text-base pt-3">
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
                  {room.offeredAmenities.map((amenity) => (
                    <div key={amenity._key} className="flex items-center md:my-0 my-1">
                      <i className={`fa-solid ${amenity.icon}`}></i>
                      <p className="text-xs md:text-base ml-2">
                        {amenity.amenity}
                      </p>
                    </div>
                  ))}
                </div>
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
            <BookRoomCta
              discount={room.discount}
              price={room.price}
              specialNote={room.specialNote}
              checkinDate={checkinDate}
              setCheckinDate={setCheckinDate}
              checkoutDate={checkoutDate}
              setCheckoutDate={setCheckoutDate}
              calcMinCheckoutDate={calcMinCheckoutDate}
              adults={adults}
              setAdults={setAdults}
              noOfChildren={noOfChildren}
              setNoOfChildren={setNoOfChildren}
              isBooked={room.isBooked}
              handleBookNowClick={handleBookNowClick}
              telephone={telephone}
              setTelephone={setTelephone}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
