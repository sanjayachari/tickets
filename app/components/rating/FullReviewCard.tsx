import { User } from "lucide-react";
import Image from "next/image";

type Props = {
  user_image_url: string;
  user_name: string;
  review_type_name: string;
  user_comment: string;
  user_rating: string;
  review_posting_time: string;
  average_review?: number;
  review_images?: {
    image_Id: string;
    image_Url: string;
    image_Title?: string;
    image_Description?: string;
  }[];
};

export default function FullReviewCard({
  user_image_url,
  user_name,
  review_type_name,
  user_comment,
  user_rating,
  review_posting_time,
  average_review,
  review_images = [],
}: Props) {
  // Function to replace all but the last occurrence of \n with <br />
  function replaceAllButLast(str: string) {
    let matches = str.match(/\n/g);
    if (!matches) return str;

    return str.replace(/\n/g, (match, offset, string) => {
      return offset === string.lastIndexOf(match) ? match : "<br />";
    });
  }

  const userComment = replaceAllButLast(user_comment);

  return (
    <div className="w-full min-w-[300px] flex flex-col bg-white border-2 rounded-lg p-3">
      {/* Header */}
      <div className="flex items-center">
        {user_image_url ? (
          <Image
            src={user_image_url}
            alt={user_name}
            width={40}
            height={40}
            priority
            className="w-10 h-10 rounded-full mr-4 border-2 object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full mr-4 border-2 flex items-center justify-center bg-gray-200 text-gray-500">
            <User size={20} />
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold uppercase">{user_name}</h3>
          <p className="text-xs text-gray-500">
            <span className="text-sm text-secondary font-medium mr-2">
              {average_review ? average_review + "/5" : user_rating}
            </span>
            {review_type_name}
          </p>
        </div>
      </div>

      {/* Comment */}
      <div className="mt-2 ml-14">
        <p
          className="text-sm lg:text-base text-gray-700"
          dangerouslySetInnerHTML={{ __html: userComment }}
        />
      </div>

      {/* Review Images */}
      {review_images.length > 0 && (
        <div className="ml-14 mt-3 flex gap-2 flex-wrap">
          {review_images.map((img) => (
             <Image
        key={img.image_Id}
        src={img.image_Url}
        alt={img.image_Title || "review image"}
        width={60}
        height={60}
        className="w-[60px] h-[60px] rounded-lg object-contain border bg-gray-100"
      />
          ))}
        </div>
      )}

      {/* Date */}
      <div className="ml-14 mt-1">
        <p className="text-sm text-gray-500">- {review_posting_time}</p>
      </div>
    </div>
  );
}
