import Image from "next/image";

interface Props {
  data: any[];
  tourOperatorInfo: any;
}

export default function TourActivityInfo({ data, tourOperatorInfo }: Props) {
  const getIcon = (index: number) => {
    const pathArr = [
      "/icons/things-to-do/cal.svg",
      "/icons/things-to-do/payment.png",
      "/icons/things-to-do/duration.svg",
      "/icons/things-to-do/skip-line.svg",
      "/icons/things-to-do/guide.svg",
      "/icons/things-to-do/aar.svg",
      "/icons/things-to-do/wheelchair.svg",
      "/icons/things-to-do/group.svg",
    ];
    return pathArr[index];
  };

  return (
    <article className="border-t border-gray-200 pt-2">
      <h2 className="mb-1 text-lg font-semibold text-secondary sm:text-xl md:text-2xl">
        About this Activity
      </h2>
      <div className="space-y-4">
        {data.map((item: any, idx: number) => (
          <div key={`activity-item-${item.title}`} className="">
            <div className="flex gap-x-4">
              <div className="relative w-7">
                <Image
                  alt="icons image"
                  title="icons image"
                  src={getIcon(idx)}
                  width={28}
                  height={28}
                  className="w-7"
                />
              </div>
              <div className="w-full text-sm tracking-wide">
                <p className="py-0.5 font-semibold">{item.title}</p>
                <p className="text-xs">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
