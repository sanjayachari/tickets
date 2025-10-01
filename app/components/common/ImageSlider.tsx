import Image from "next/image";
import FallbackImage from "../common/FallbackImage";

type Props = {
  data: any;
  imageHeight?: string;
  setIsCollegeOpen?: any;
};

export default function ImageSlider({
  data,
  imageHeight,
  setIsCollegeOpen,
}: Props) {

  const imageUrl =
    data && typeof data === "object"
      ? "image_Url" in data
        ? data.image_Url
        : "url" in data
          ? data.url
          : "/images/placeholder.svg"
      : "/images/placeholder.svg";

  return (
    <div className="group flex min-w-[300px] snap-start flex-col space-y-4">
      <div className={`relative w-full overflow-hidden ${imageHeight}`}>
        {!imageUrl ? (
          <FallbackImage />
        ) : (
          <Image
            src={imageUrl}
            alt={"package main image"}
            title={"package main image"}
            width={480}
            height={270}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onClick={() => setIsCollegeOpen(true)}
          />
        )}
      </div>
      {imageUrl && (
        <div
          onClick={() => setIsCollegeOpen(true)}
          className="absolute bottom-5 right-2 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-black bg-opacity-10 p-2 px-4 text-white"
        >
          <Image
            src={"/icons/things-to-do/gallary.svg"}
            alt={"trip image 4"}
            title={"trip image 4"}
            height={1000}
            width={1000}
            className="relative h-[15px] w-[15px] object-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
          />
          4+
        </div>
      )}
    </div>
  );
}
