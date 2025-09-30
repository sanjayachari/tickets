import { format } from "date-fns";
import Image from "next/image";

type Props = {
  review: any;
  onclick?: any;
  isSelected?: boolean;
};

export default function ReviewCard({ review, onclick, isSelected }: Props) {
  return (
    <div className={`min-h-fit aspect-auto min-w-[280px] snap-start rounded-xl border-2 p-4
      ${isSelected ? "border-[#005250] bg-[#e6f7f5] shadow-lg" : "border-gray-200"}
    `}>
      <div className="z-10 flex items-center justify-between">
        <p className="flex gap-0.5">
          {[...Array(4)].map((_, idx) => (
            <span key={idx}>&#11088;</span>
          ))}
        </p>
      </div>
      <div className="my-2 flex gap-x-2.5">
        <div className="grid w-10 place-items-center rounded-full border">
          <Image
            alt="icons image"
            title="icons image"
            src="/icons/things-to-do/group.svg"
            width={24}
            height={24}
            className="w-6"
          />
        </div>
        <div className="tracking-wide">
          <p className="py-0.5 text-sm font-semibold">
            {review.review_User_Name || "Anonymous"}
          </p>
          <p className="text-xs text-gray-500">
            {format(new Date(review.review_Date), "dd, MMM yyy")}
          </p>
        </div>
      </div>
      <div>
        <p className="line-clamp-6 text-xs tracking-wide">
          {review.review_Description}
        </p>
        {onclick && (
          <button className="GA_4_TTD_TOUR_REVIEWS_TRIGGER p-0.5 text-xs text-blue-700 underline font-semibold tracking-wide" onClick={onclick}>
            see more
          </button>
        )}
      </div>
    </div>
  );
}
