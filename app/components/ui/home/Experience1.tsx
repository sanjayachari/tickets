import React from "react";
import CategorySection from "./CategorySection";
import FlexBanner from "./FlexBanner";
import Promo from "./Promo";
import HomeAbout from "./HomeAbout";
import { POIItem } from "@/app/page";
import { DomainData } from "@/app/classes/DomainData";


interface ExperiencesProps {
  formattedPoiItems: [string, POIItem[]][];
   domainData: DomainData | null
}

// Components rotation list
const extraComponents = [FlexBanner, Promo, HomeAbout];

const Experiences1: React.FC<ExperiencesProps> = ({ formattedPoiItems , domainData }) => {
  console.log('formattedPoiItems' , formattedPoiItems)
  return (
    <div className="bg-white">
      <section className="py-10">
        {formattedPoiItems.map(([category, items], idx) => {
          // Check if this category is at a "barrier" position (every 2 categories or last one)
          const isBarrier =
            (idx + 1) % 2 === 0 || idx === formattedPoiItems.length - 1;

          // Determine which extra component to render in rotation
          const ExtraComponent = isBarrier
            ? extraComponents[Math.floor(idx / 2) % extraComponents.length]
            : null;

          return (
            <React.Fragment key={idx}>
              {/* CategorySection inside max-width container */}
              <div className="max-w-[1440px] mx-auto px-4 md:px-20 mb-10">
                <CategorySection
                  title={`${category} in ${domainData && domainData.domain_City}`}
                  items={items.slice(0, 4).map((poi) => ({
                    image: poi.destination_Image_Url || "/fallback/fallback.png",
                    title: poi.id.replace(/-/g, " "),
                    offer: poi.destination_City_Slug,
                    description: poi.destination_Landmark,
                  }))}
                  onSeeAll={() =>
                    console.log(`See all ${category} clicked`)
                  }
                />
              </div>

              {/* Extra component full width */}
              {ExtraComponent && (
                <div className="w-full mb-10">
                  <ExtraComponent />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </section>
    </div>
  );
};

export default Experiences1;
