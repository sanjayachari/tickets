import React from "react";
import CategorySection from "../home/CategorySection";
import FlexBanner from "../home/FlexBanner";
import Promo from "../home/Promo";
import HomeAbout from "../home/HomeAbout";
import { POIItem } from "@/app/page";
import { DomainData } from "@/app/classes/DomainData";
import PromoBanner1 from "./PromoBanner1";
import PromoBanner2 from "./PromoBanner2";
import PromoBanner from "./PromoBanner";
import CategorySectionAttraction from "./CategorySectionAttraction";


interface ExperiencesProps {
  formattedPoiItems: [string, POIItem[]][];
   domainData: DomainData | null
}

// Components rotation list
const extraComponents = [PromoBanner, PromoBanner1, PromoBanner2];

const ExperiencesAttraction: React.FC<ExperiencesProps> = ({ formattedPoiItems , domainData }) => {
  console.log('___formattedPoiItems'  , formattedPoiItems)
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
                <CategorySectionAttraction
                  title={`${category} in ${domainData && domainData.domain_City}`}
                  items={items.slice(0, 4).map((poi) => ({
                    image: poi.destination_Image_Url || "/fallback/fallback.png",
                    title: poi.id.replace(/-/g, " "),
                    offer: poi.destination_City_Slug,
                    description: poi.destination_Landmark,
                    categoriesTypes: poi.destination_Category,
                    city : domainData && domainData.domain_City
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

export default ExperiencesAttraction;
