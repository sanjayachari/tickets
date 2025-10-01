// import { TicketIcon } from "@heroicons/react/outline";
// import { ChevronDownIcon } from "@heroicons/react/solid";
import { ChevronDownIcon, TicketIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  data: any[];
}

export default function TourItinerary({ data }: Props) {
  // make them all open by default
  const [showDescription, setShowDescription] = useState(
    Object.fromEntries(data.map((_, idx) => [idx, true])),
  );

  const handleToggleDescription = (idx: number) => {
    setShowDescription((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <article className="mt-3 w-full border-t border-gray-200 pt-2 text-dark">
      <h2 className="mb-2 text-lg font-semibold text-secondary sm:text-xl md:text-2xl">
        Itinerary
      </h2>

      <div className="relative">
        <div className="absolute inset-y-0 left-2.5 border-l-4 border-dotted border-secondary"></div>
        <div className="w-full space-y-5 pl-10">
          {data.map((stop: any, idx: number) => (
            <div key={`pit-stop-${idx}`}>
              {/* Location Marker */}
              <div className="absolute left-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-secondary ring-2 ring-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    fillRule="evenodd"
                    d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Clickable Section */}
              <div
                className="flex w-full cursor-pointer items-start justify-between"
                onClick={() => handleToggleDescription(idx)}
                aria-expanded={showDescription[idx]}
              >
                <div className="w-full">
                  <p className="GA_4_TTD_ITINERARY_TRIGGER font-semibold">{stop.title}</p>

                  {/* Smooth Transition Fix */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      showDescription[idx]
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="GA_4_TTD_ITINERARY_TRIGGER text-sm transition-opacity duration-200">
                      {stop.description}
                    </p>
                  </div>
                  {stop?.admission_Availability && (
                    <div className="mt-1 flex items-center text-sm">
                      <span>
                        <TicketIcon className="mr-2 h-4 w-4 text-gray-500" />
                      </span>
                      <span className="text-gray-500">Admission Included</span>
                    </div>
                  )}
                </div>

                {/* Toggle Icon */}
                <button>
                  <ChevronDownIcon
                    className={`h-6 w-6 transition-transform duration-300 ${
                      showDescription[idx] ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
