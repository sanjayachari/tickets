// import { ChevronDownIcon, CheckIcon, XIcon } from "@heroicons/react/solid";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import Link from "next/link";

interface SectionKeys {
  tourHighlights: boolean;
  tourHighlightInclusion: boolean;
  tourHighlightExclusion: boolean;
  tourImportantInformation: boolean;
  tourMeetingPoint: boolean;
  tourEndingPoint: boolean;
  tourDescription: boolean;
  tourCancellationPolicy: boolean;
  tourMustKnowFeatures: boolean;
}

interface Props {
  handleToggle: (key: keyof SectionKeys) => void;
  isOpen: SectionKeys;
  data: any;
  sectionKey: keyof SectionKeys;
  title: string;
  type?:
    | "list"
    | "inclusionlist"
    | "exclusionlist"
    | "importantInfo"
    | "location"
    | "text"
    | "html"
    | "jsx";
}

export default function TourAccordian({
  handleToggle,
  isOpen,
  data,
  sectionKey,
  title,
  type = "text",
}: Props) {
  return (
    <article className="flex w-full flex-col gap-2 py-2.5 text-justify max-md:border-b md:flex-row">
      <div
        className="flex min-w-[220px] justify-between"
        onClick={() => handleToggle(sectionKey)}
      >
        <h3 className="text-lg font-bold md:text-[18px]">{title}</h3>
        <ChevronDownIcon
          className={`h-6 w-6 ${isOpen[sectionKey] ? "rotate-180" : ""} md:hidden`}
        />
      </div>
      <div className={`${isOpen[sectionKey] ? "block" : "hidden"} md:block`}>
        {type === "list" && Array.isArray(data) ? (
          data.map((item: string, idx: number) => (
            <p key={idx} className="py-0.5 ">
              <span className="ml-1 mr-3 font-extrabold">&bull;</span> {item}
            </p>
          ))
        ) : type === "inclusionlist" && Array.isArray(data) ? (
          data.map((item: string, idx: number) => (
            <div
              key={`list-item-${idx}`}
              className="flex items-center gap-3 py-0.5"
            >
              <CheckIcon className="h-4 min-w-4 fill-secondary" />
              <p className="w-full">{item}</p>
            </div>
          ))
        ) : type === "exclusionlist" && Array.isArray(data) ? (
          data.map((item: string, idx: number) => (
            <div
              key={`list-item-${idx}`}
              className="flex items-center gap-3 py-0.5"
            >
              <XIcon className="h-4 min-w-4 fill-red-500" />
              <p className="w-full py-0.5">{item}</p>
            </div>
          ))
        ) : type === "importantInfo" && Array.isArray(data) ? (
          data.map((item: any, idx: number) => (
            <div key={`item-${idx}`} className={`${idx !== 0 && "pt-2"}`}>
              <p>{item.paragraphs}</p>
              {item.listItems.map((item: string, idx: number) => (
                <p key={`list-item-${idx}`} className="py-0.5">
                  &bull; {item}
                </p>
              ))}
            </div>
          ))
        ) : type === "location" ? (
          <div>
            <Link
              target="_blank"
              className="cursor-pointer underline"
              href={data.map_Url}
            >
              {data.address}
            </Link>
            <p className="mt-1 font-semibold">{data.info}</p>
          </div>
        ) : type === "html" ? (
          <div
            dangerouslySetInnerHTML={{ __html: data }}
            className="ml-4 text-xs leading-normal sm:text-sm lg:ml-0 lg:text-base
          [&>h3]:mb-2 [&>h3]:text-base [&>h3]:font-bold sm:[&>h3]:text-lg md:[&>h4]:text-xl
          [&>p]:mb-2 [&>p]:text-xs sm:[&>p]:text-sm md:[&>p]:text-base
          [&>ul]:ml-4 [&>ul]:list-disc"
          />
        ) : type === "jsx" ? (
          <div>{data}</div>
        ) : (
          <p>{data}</p>
        )}
      </div>
    </article>
  );
}
