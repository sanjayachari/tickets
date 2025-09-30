import Image from "next/image";
import Link from "next/link";

type Props = {
  place: any;
};

export default function PlaceCard({ place }: Props) {
  return (
    <div className="my-0.5 flex items-center gap-1 py-2 font-medium">
      <Image
        src="/map.svg"
        alt={place.place_Name}
        width={28}
        height={28}
        className="h-7 w-7 rounded-full p-[1px]"
      />
      <h3 className="line-clamp-1 whitespace-nowrap text-sm">
        {place.place_Name}
      </h3>
    </div>
  );
}
