import poi from "@/pages/api/search/poi";
import React from "react";

interface Props {
  tourName: string;
  tourCity: string;
}

const TourAdditionalContent = (props: Props) => {
  return (
    <div className="wrapper rounded-2xl border border-gray-300 p-4 text-justify">
      <KnowBeforeYouGo tourCity={props.tourCity} tourName={props.tourName} />
      <GettingReadyToGo tourCity={props.tourCity} tourName={props.tourName} />
      <PassportsAndVisas
        destinationCountry={"India"}
        visaURL={"https://staybook.in/indian-e-visa"}
      />
      <TourPreparation tourCity={props.tourCity} tourName={props.tourName} />
      <TravelPreparation trainingType={"cardio"} safetyAdviceLink={""} />
      <ConnectivityInfo country={"India"} />
      <StayingHealthy countryName={"India"} destinationName={"India"} />
      <TourEtiquette destinationName={"India"} />
      <ClimateAndClothing tourCity={props.tourCity} tourName={props.tourName} />
      <AboutDrones tourCity={props.tourCity} tourName={props.tourName} />
      <BookAndFilmRecommendations
        tourCity={props.tourCity}
        tourName={props.tourName}
      />
      <IndiaBookRecommendations
        tourCity={props.tourCity}
        tourName={props.tourName}
      />
      <AboutYourAccommodations
        tourCity={props.tourCity}
        tourName={props.tourName}
      />
      <AtYourDestination tourCity={props.tourCity} tourName={props.tourName} />
      <AboutYourSightseeing
        tourCity={props.tourCity}
        tourName={props.tourName}
      />
    </div>
  );
};

export default TourAdditionalContent;

const AboutYourSightseeing = ({
  tourName,
  tourCity,
}: {
  tourName: string;
  tourCity: string;
}) => {
  return (
    <div>
      <h2 className="mt-3 text-xl font-semibold">
        About Your {tourName} Sightseeing in {tourCity}
      </h2>

      {/* Seat Rotation Policy */}
      <h3 className="mt-1 text-lg font-medium">
        Seat Rotation & Group Organization
      </h3>
      <p className="text-gray-700">
        To ensure a fair and enjoyable experience for all passengers on our{" "}
        <strong>{tourName} tour</strong>, we have a{" "}
        <strong>mandatory seat rotation policy</strong> on motor coaches. Your{" "}
        <strong>Tour Manager</strong> will organize this to allow everyone an
        equal opportunity to enjoy different views throughout the journey in{" "}
        {tourCity}.
      </p>
      <p className="mt-2 text-gray-700">
        On <strong>river cruises</strong>, color-coded group splits may be used
        for both included and optional shoreside tours to help manage group
        sizes efficiently.
      </p>

      {/* Bus Facilities */}
      <h3 className="mt-4 text-lg font-medium">Motor Coach Facilities</h3>
      <p className="text-gray-700">
        Some buses used in the <strong>{tourName}</strong> may be equipped with
        a <strong>toilet facility</strong>, but please note that these are
        strictly intended for <strong>emergency use only</strong>. For safety
        reasons, the vehicle may need to stop before the facility can be used.
      </p>

      {/* Tour Adjustments Due to Holidays & Renovations */}
      <h3 className="mt-4 text-lg font-medium">
        Holiday & Renovation Adjustments
      </h3>
      <p className="text-gray-700">
        When traveling through {tourCity}, certain{" "}
        <strong>monuments and sites</strong> may be closed due to{" "}
        <strong>religious holidays or national celebrations</strong> without
        prior notice. In such cases, the {tourName} itinerary may be adjusted
        accordingly.
      </p>
      <p className="mt-2 text-gray-700">
        Additionally, during peak holiday periods or due to{" "}
        <strong>weather conditions</strong>, unforeseen circumstances may lead
        to last-minute itinerary changes, sometimes after arrival. We strive to
        provide an enjoyable experience while accommodating any necessary
        adjustments in {tourCity}.
      </p>
      <p className="mt-2 text-gray-700">
        Many <strong>national monuments and tourist sites</strong> in {tourCity}{" "}
        undergo periodic renovations, which may temporarily obstruct certain
        views. No tour will be canceled due to renovations, but we may amend
        itineraries as needed to ensure the best experience.
      </p>

      {/* Privacy Considerations */}
      <h3 className="mt-4 text-lg font-medium">Privacy & Group Photos</h3>
      <p className="text-gray-700">
        To respect the <strong>privacy</strong> of all tour participants, your
        Tour Manager will <strong>not organize group photos</strong> or collect
        passenger email addresses for a shared group list.
      </p>

      <p className="mt-4 text-gray-700">
        We appreciate your understanding and flexibility, and we look forward to
        providing you with a memorable {tourName} sightseeing experience in{" "}
        {tourCity}!
      </p>
    </div>
  );
};

const AtYourDestination = ({
  tourName,
  tourCity,
}: {
  tourName: string;
  tourCity: string;
}) => {
  return (
    <div className="rounded-lg">
      <h2 className="mt-3 text-xl font-semibold">
        At Your {tourName} Destination in {tourCity}
      </h2>

      {/* Eco & Sustainable Tourism */}
      <h3 className="mt-1 text-lg font-medium">Eco & Sustainable Tourism</h3>
      <p className="text-gray-700">
        We are committed to promoting{" "}
        <strong>eco-friendly and sustainable travel</strong> in {tourCity},
        ensuring that tourism benefits both the environment and local
        communities. As you explore {tourCity} during your {tourName}, we
        encourage you to be mindful of{" "}
        <strong>cultural sensitivity, environmental conservation,</strong> and
        ethical travel practices.
      </p>
      <p className="mt-2 text-gray-700">
        If you encounter any form of{" "}
        <strong>
          environmental harm, animal cruelty, or unethical practices
        </strong>
        , we urge you to report it. One of the greatest impacts of travel is the{" "}
        <strong>exchange of cultural knowledge</strong> and the positive changes
        it can bring through awareness and education.
      </p>
      <p className="mt-2 text-gray-700">
        Above all, we ask travelers to{" "}
        <strong>respect local customs, traditions, and people</strong> in{" "}
        {tourCity}, fostering an atmosphere of understanding and appreciation.
      </p>

      {/* Staggered Arrivals & Departures */}
      <h3 className="mt-6 text-lg font-medium">
        Staggered Arrivals & Departures
      </h3>
      <p className="text-gray-700">
        Some {tourName} tours offer <strong>flexible itinerary options</strong>,
        allowing travelers to{" "}
        <strong>arrive and depart at different points</strong>
        in the schedule. As a result, you may notice that the number of
        participants in your group varies throughout your trip in {tourCity}.
      </p>
      <p className="mt-2 text-gray-700">
        Whether you&apos;re joining for a single destination or an extended
        journey, we ensure a seamless experience in {tourCity}, so you can focus
        on enjoying your {tourName} adventure!
      </p>
    </div>
  );
};

const AboutYourAccommodations = ({
  tourName,
  tourCity,
}: {
  tourName: string;
  tourCity: string;
}) => {
  return (
    <div className="rounded-lg">
      <h2 className="mt-3 text-xl font-semibold">
        About Your Accommodations in {tourCity}
      </h2>

      {/* Hotel Selection */}
      <h3 className="mt-1 text-lg font-medium">Hotels in {tourCity}</h3>
      <p className="text-gray-700">
        <strong>Staybook</strong> carefully selects hotels for the {tourName}{" "}
        tour based on quality, location, price, service, and cleanliness. All
        rooms are <strong>standard twin-bedded rooms</strong> with private
        facilities. Special requests such as bed types, smoking preference, and
        connecting rooms are subject to availability and determined by hotel
        management.
      </p>

      {/* Air Conditioning & Amenities */}
      <h3 className="mt-1 text-lg font-medium">Air Conditioning & Amenities</h3>
      <p className="text-gray-700">
        Air conditioning in hotels in {tourCity} may differ from what travelers
        are accustomed to. In some regions, its use is limited due to energy
        conservation efforts or seasonal regulations. Many hotels operate air
        conditioning <strong>only during the summer months</strong> or{" "}
        <strong>on a set schedule</strong> that may restrict usage at night.
      </p>
      <p className="mt-2 text-gray-700">
        Additionally, some lodges or remote accommodations in {tourCity} may not
        offer standard amenities such as:
      </p>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>Hairdryers</li>
        <li>Alarm clocks</li>
        <li>Room service</li>
      </ul>

      {/* India Hotel Passport Requirement */}
      <h3 className="mt-1 text-lg font-medium">
        {tourCity} Hotels – Passport Requirement
      </h3>
      <p className="text-gray-700">
        If you&apos;re traveling to {tourCity} for the {tourName} tour, you may
        be required to present your{" "}
        <strong>passport or a copy of your passport</strong> upon check-in at
        each hotel. This is a security requirement, so please be prepared to
        provide the necessary documentation upon arrival.
      </p>

      {/* Hotel Check-in/Check-out Policy */}
      <h3 className="mt-1 text-lg font-medium">Hotel Check-in & Check-out</h3>
      <p className="mt-2 text-gray-700">
        If you need an early check-in or late check-out in {tourCity}, inquire
        at the front desk upon arrival—requests are subject to hotel
        availability.
      </p>

      <p className="mt-4 text-gray-700">
        Understanding hotel policies and amenities in advance will help ensure a
        smooth and comfortable stay during your {tourName} experience in{" "}
        {tourCity}!
      </p>
    </div>
  );
};

const IndiaBookRecommendations = ({
  tourName,
  tourCity,
}: {
  tourName: string;
  tourCity: string;
}) => {
  return (
    <div className="rounded-lg">
      <h2 className="mt-3 text-xl font-semibold">
        {tourCity}: Book Recommendations for Your {tourName} Tour
      </h2>
      <p className="mt-1 text-gray-700">
        Exploring {tourCity} through books is a great way to understand its{" "}
        <strong>rich history, diverse culture,</strong> and{" "}
        <strong>vibrant landscapes.</strong> Whether you&apos;re looking for{" "}
        <strong>historical insights, personal memoirs,</strong> or{" "}
        <strong>captivating fiction set in India,</strong> these books come
        highly recommended by travelers and experts.
      </p>

      <h3 className="mt-1 text-lg font-medium">
        Top Books on {tourCity} & India
      </h3>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>
          <strong>The Holy Cow and Other India Stories</strong> – Tarun Chopra
        </li>
        <li>
          <strong>A Princess Remembers</strong> – Gayatri Devi
        </li>
        <li>
          <strong>The Last Mughal</strong> – William Dalrymple
        </li>
        <li>
          <strong>The Discovery Of India</strong> – Jawaharlal Nehru
        </li>
        <li>
          <strong>No Full Stops in India</strong> – Mark Tully
        </li>
        <li>
          <strong>City of Djinns</strong> – William Dalrymple
        </li>
        <li>
          <strong>Freedom at Midnight</strong> – Dominique Lapierre and Larry
          Collins
        </li>
        <li>
          <strong>Beneath a Marble Sky</strong> – John Shors
        </li>
        <li>
          <strong>India: An Introduction</strong> – Khushwant Singh
        </li>
        <li>
          <strong>Train to Pakistan</strong> – Khushwant Singh
        </li>
      </ul>

      <p className="mt-4 text-gray-700">
        Whether you&apos;re interested in{" "}
        <strong>royalty, colonial history, independence struggles,</strong> or{" "}
        <strong>modern Indian society,</strong> these books offer fascinating
        insights into the heart of {tourCity}. Grab one before your {tourName}
        tour and immerse yourself in the magic of {tourCity} even before you
        arrive!
      </p>
    </div>
  );
};

const BookAndFilmRecommendations = ({ tourName, tourCity }) => {
  return (
    <div className="rounded-lg">
      <h2 className="mt-3 text-xl font-semibold">
        Book & Film Recommendations for Your {tourName} Tour in {tourCity}
      </h2>

      <p className="text-gray-700">
        Many travelers enjoy reading about {tourCity} before or during their
        trip to enhance their experience. Whether it&apos;s a{" "}
        <strong>travel guide, a historical deep dive,</strong>
        or a <strong>fictional novel set in {tourCity},</strong> a good book can
        add valuable context to your {tourName} journey.
      </p>

      <p className="mt-2 text-gray-700">
        Similarly, watching a <strong>film set in {tourCity}</strong> can help
        set the mood and give you a visual preview of the culture, landscapes,
        and history you’re about to explore during your
        {tourName} tour.
      </p>

      <h3 className="mt-1 text-lg font-medium">
        Recommendations from Our Team for Your {tourName} Tour in {tourCity}
      </h3>
      <p className="text-gray-700">
        Our Tour Managers and staff have compiled a list of books and films that
        past guests have enjoyed. These selections are{" "}
        <strong>not official endorsements</strong>, but rather{" "}
        <strong>guest recommendations</strong>
        to inspire and prepare you for your {tourName} adventure in {tourCity}.
      </p>

      <p className="mt-4 text-gray-700">
        Whether you prefer{" "}
        <strong>classic literature, contemporary travel writing,</strong> or an
        <strong>immersive documentary,</strong> we encourage you to explore
        these recommendations and bring a piece of {tourCity} to life even
        before you arrive!
      </p>
    </div>
  );
};

const AboutDrones = ({ tourName, tourCity }) => {
  return (
    <div className="rounded-lg">
      <h2 className="mt-3 text-xl font-semibold">
        About Drones on Your {tourName} Tour in {tourCity}
      </h2>

      <p className="text-gray-700">
        Drone technology has become increasingly popular for recreational use,
        offering stunning aerial views of landscapes and attractions. However,
        laws and regulations regarding drones vary widely between countries, and
        some locations may have strict restrictions or ongoing regulatory
        changes, including in {tourCity}.
      </p>

      <h3 className="mt-1 text-lg font-medium">
        What You Need to Know for Your {tourName} Tour in {tourCity}
      </h3>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>
          It is the responsibility of travelers to research and comply with{" "}
          <strong>local drone regulations</strong> in {tourCity} and the
          countries they are visiting.
        </li>
        <li>
          Check with your <strong>airline</strong> in advance to ensure you meet
          their requirements for carrying or transporting drones.
        </li>
        <li>
          Some destinations may <strong>ban drones entirely</strong> or require
          special permits for use, including {tourCity}.
        </li>
        <li>
          For safety and time constraints,{" "}
          <strong>tours cannot be extended</strong> to accommodate drone usage.
        </li>
      </ul>

      <p className="mt-4 text-gray-700">
        Before packing your drone for your {tourName} tour in {tourCity}, ensure
        that you understand the legal requirements and restrictions to avoid any
        inconvenience during your travels.
      </p>
    </div>
  );
};

const ClimateAndClothing = ({ tourName, tourCity }) => {
  return (
    <div className="rounded-lg">
      <h2 className="mt-3 text-xl font-semibold">
        Climate & Clothing for Your {tourName} Tour in {tourCity}
      </h2>

      {/* General Packing Tips */}
      <h3 className="mt-1 text-lg font-medium">What to Pack for {tourCity}</h3>
      <p className="text-gray-700">
        When traveling to {tourCity}, comfort is key. Be prepared for varying
        temperatures by bringing:
      </p>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>Comfortable walking shoes for sightseeing and exploring.</li>
        <li>
          A sweater and layered clothing to adjust to changing temperatures.
        </li>
        <li>An all-weather jacket for unpredictable weather conditions.</li>
        <li>A good pair of sunglasses for sun protection.</li>
      </ul>

      {/* Dress Code for Religious Sites */}
      <h3 className="mt-1 text-lg font-medium">
        Dress Code for Religious Sites in {tourCity}
      </h3>
      <p className="text-gray-700">
        Some religious sites in {tourCity} require modest dress for entry.
        Please follow these guidelines:
      </p>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>
          No shorts or short skirts; knees must be covered with long pants or a
          long skirt.
        </li>
        <li>No sleeveless tops; shoulders must be covered.</li>
        <li>
          A shawl or scarf is often{" "}
          <span className="text-red-500">not accepted</span> as a cover, so plan
          accordingly.
        </li>
      </ul>

      {/* Seasonal Weather in India */}
      <h3 className="mt-1 text-lg font-medium">Weather in {tourCity}</h3>
      <p className="text-gray-700">{tourCity} has three main seasons:</p>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>
          <strong>November to March:</strong> Pleasant with warm, sunny days.
        </li>
        <li>
          <strong>May to June:</strong> Hot temperatures, particularly in
          northern regions.
        </li>
        <li>
          <strong>June to October:</strong> Monsoon season, with heavy rainfall
          starting in the west and spreading across the country.
        </li>
        <li>
          <strong>Mid-October to December:</strong> Southern India receives its
          heaviest rainfall.
        </li>
      </ul>

      <p className="mt-4 text-gray-700">
        By packing appropriately and staying informed about local weather
        conditions in {tourCity}, you can make the most of your {tourName}{" "}
        journey!
      </p>
    </div>
  );
};

const KnowBeforeYouGo = ({ tourName, tourCity }) => {
  return (
    <div className="rounded-lg">
      <p className="text-gray-700">
        We&apos;ve taken care of most of the planning and preparation for you,
        so you can focus on enjoying your {tourName} tour in {tourCity}!
        However, there are a few important things to keep in mind to ensure your
        journey is smooth, safe, and stress-free. Take a moment to review the
        following details before your departure—this way, the only surprises
        you&apos;ll encounter will be the pleasant ones!
      </p>
    </div>
  );
};

const GettingReadyToGo = ({ tourName, tourCity }) => {
  return (
    <div className="rounded-lg">
      <h2 className="mt-3 text-xl font-semibold">Getting Ready to Go</h2>
      <h3 className="mb-2 text-lg font-medium">Traveling to {tourCity}</h3>
      <p className="text-gray-700">
        Traveling to {tourCity} as part of your {tourName} tour is an
        unforgettable experience. {tourCity} offers a fascinating blend of
        ancient traditions and modern energy.
      </p>
      <p className="mt-2 text-gray-700">
        As with any travel destination, {tourCity} presents unique experiences.
        Bustling markets and lively streets create an atmosphere full of life
        and energy. While the country’s diversity is stunning, some areas may
        reflect economic contrasts. Understanding {tourCity}’s dynamic blend of
        tradition and progress will enhance your journey, allowing you to fully
        embrace its beauty.
      </p>
      <p className="mt-2 text-gray-700">
        India’s cuisine is a delight for food lovers, offering everything from
        aromatic street food to elaborate royal feasts. The country’s spiritual
        essence is evident in its temples, historic sites, and sacred rivers,
        inviting travelers to experience a deeper sense of connection and
        discovery.
      </p>
      <p className="mt-2 text-gray-700">
        To make the most of your {tourName} tour in {tourCity}, it’s helpful to
        stay informed about local customs, be open to new experiences, and
        embrace the lively pace of everyday life. Whether you are exploring
        ancient forts, enjoying a boat ride on the Ganges, or simply sharing a
        smile with a local vendor, {tourCity}’s charm will stay with you long
        after your journey ends. We are excited to introduce you to the people,
        history, and cultural richness of this incredible destination!
      </p>
    </div>
  );
};

const PassportsAndVisas = ({ destinationCountry, visaURL }) => {
  return (
    <div className="rounded-lg">
      <h2 className="mt-3 text-xl font-semibold">Passports & Visas</h2>
      <p className="text-gray-700">
        Before you embark on your journey, please ensure that your passport is
        valid for at least <strong>six months beyond your travel dates</strong>.
        Depending on your destination, a visa may also be required. To avoid any
        last-minute issues, we recommend checking the latest visa requirements
        at{" "}
        <a
          href={visaURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Staybook Travel Visa Information
        </a>
        .
      </p>
      <p className="mt-2 text-gray-700">
        If you are <strong>not a U.S. citizen</strong>, it’s important to check
        with your country’s consulate or a visa agency to confirm entry
        requirements. Some itineraries may require a{" "}
        <strong>double-entry visa</strong>, so be sure to verify if you’ll be
        re-entering the same country during your trip.
      </p>
      <p className="mt-2 text-gray-700">
        Passport applications can be completed at most U.S. Post Offices or
        regional Passport Agencies. If your trip to {destinationCountry}{" "}
        requires a visa, ensure that your passport has{" "}
        <strong>blank pages available</strong>
        for stamps and entry permits. Planning ahead will make your travels
        smooth and stress-free!
      </p>
    </div>
  );
};

const TravelPreparation = ({ trainingType, safetyAdviceLink }) => {
  return (
    <div className="rounded-lg">
      <h2 className="mt-3 text-xl font-semibold">Travel Preparation</h2>

      {/* Physical Training Section */}
      <h3 className="mt-1 text-lg font-medium">Physical Training</h3>
      <p className="text-gray-700">
        To make the most of your journey, it&apos;s a great idea to{" "}
        <strong>prepare your body</strong> for any walking or physical
        activities involved in your tour. We recommend incorporating{" "}
        <strong>{trainingType}</strong> for at least <strong>six weeks</strong>{" "}
        before your trip.
      </p>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>
          Start with <strong>5-10 minutes of stretching</strong> before any
          exercise to prevent injury.
        </li>
        <li>
          Walk on <strong>hilly terrain</strong> or use a treadmill with incline
          settings to prepare for uneven paths.
        </li>
        <li>
          Consider <strong>using walking sticks</strong> if your tour involves
          trekking or longer walks.
        </li>
        <li>
          Maintain a <strong>steady but comfortable pace</strong> during
          activities.
        </li>
        <li>
          Stay <strong>hydrated</strong> before, during, and after exercise.
        </li>
      </ul>
      <p className="mt-2 text-gray-700">
        These small steps will ensure you feel{" "}
        <strong>energized and ready</strong> to fully enjoy your trip!
      </p>

      {/* Travel Safety Advice Section */}
      <h3 className="mt-6 text-lg font-medium">Travel Safety Advice</h3>
      <p className="text-gray-700">
        Your safety is our <strong>top priority</strong>. While most tours go
        exactly as planned, unexpected situations such as{" "}
        <strong>
          weather changes, transportation delays, or civil disruptions
        </strong>{" "}
        can sometimes arise.
      </p>
      <p className="mt-2 text-gray-700">
        In rare cases where safety concerns arise, we make informed decisions
        based on <strong>official government advisories</strong>. If changes to
        your itinerary are necessary, our team—along with airlines, hotels, and
        local authorities—will work together to{" "}
        <strong>ensure your well-being</strong> while keeping your trip as
        enjoyable as possible.
      </p>
      <p className="mt-2 text-gray-700">
        Before your departure, we <strong>strongly recommend</strong> that you
        review travel advisories for your destination. Stay informed by visiting
        the official travel advisories page:{" "}
        <a
          href={safetyAdviceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Travel Safety Advice
        </a>
      </p>
    </div>
  );
};

const ConnectivityInfo = ({ country }) => {
  const countryCallingInfo = {
    USA: {
      exitCode: "011",
      countryCode: "49",
      exampleNumber: "011-49-555-555",
    },
    Germany: {
      exitCode: "00",
      countryCode: "49",
      exampleNumber: "00-49-555-555",
    },
    // Add more countries as needed
  };

  const callingInfo = countryCallingInfo[country] || {};

  return (
    <div className="rounded-lg">
      <h2 className="mt-3 text-xl font-semibold">
        Staying Connected While Traveling
      </h2>

      {/* Mobile Phones Section */}
      <h3 className="mt-1 text-lg font-medium">
        Mobile Phones & International Plans
      </h3>
      <p className="text-gray-700">
        Mobile networks vary by country, so it’s best to check with your
        provider before traveling to ensure your plan will work at your
        destination. To <strong>avoid high roaming charges</strong>, consider:
      </p>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>
          Purchasing an <strong>international plan</strong> to use your talk,
          text, and data abroad.
        </li>
        <li>
          Using <strong>WiFi-based calling apps</strong> like{" "}
          <strong>WhatsApp</strong> or <strong>Skype</strong> for free internet
          calls.
        </li>
        <li>
          Checking if your provider offers{" "}
          <strong>daily or weekly travel passes</strong> for seamless
          connectivity.
        </li>
      </ul>

      {/* International Calling Section */}
      <h3 className="mt-6 text-lg font-medium">Making International Calls</h3>
      <p className="text-gray-700">
        When dialing internationally, use the <strong>Exit Code</strong>,
        followed by the <strong>Country Code</strong>, then the{" "}
        <strong>Phone Number</strong>. If dialing from a mobile phone, you can
        replace the exit code with <strong>“+”</strong> by pressing and holding
        the 0 key.
      </p>
      {callingInfo.countryCode && (
        <div className="mt-3 rounded-lg bg-white p-3 shadow-md">
          <h4 className="text-md font-medium">Example - Calling {country}</h4>
          <ul className="mt-2 list-disc pl-6 text-gray-700">
            <li>
              From the <strong>USA or a US cell phone</strong>:{" "}
              <strong>
                {callingInfo.exitCode}-{callingInfo.countryCode}-555-555
              </strong>
            </li>
            <li>
              From <strong>another country</strong>:{" "}
              <strong>00-{callingInfo.countryCode}-555-555</strong>
            </li>
            <li>
              From a{" "}
              <strong>
                {country} phone within {country}
              </strong>
              : <strong>0555-555</strong>
            </li>
          </ul>
        </div>
      )}

      {/* WiFi Access Section */}
      <h3 className="mt-6 text-lg font-medium">WiFi Access</h3>
      <p className="text-gray-700">
        WiFi is widely available in most{" "}
        <strong>hotels, airports, cruise lines, trains, and buses</strong>.
        However, keep in mind:
      </p>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>
          Service <strong>may require a fee</strong>, especially in airports,
          flights, or cruise ships.
        </li>
        <li>
          Speed and reliability can <strong>vary greatly</strong>, particularly
          on moving vehicles or in remote locations.
        </li>
        <li>
          In some developing countries, WiFi access can be{" "}
          <strong>slow, unstable, or unavailable</strong>.
        </li>
      </ul>
      <p className="mt-2 text-gray-700">
        To ensure uninterrupted connectivity, consider{" "}
        <strong>
          downloading offline maps, translations, or important documents
        </strong>{" "}
        before traveling.
      </p>
    </div>
  );
};

const TourPreparation = ({ tourName, tourCity }) => {
  return (
    <div className="rounded-lg">
      <h2 className="mt-3 text-xl font-semibold">
        Getting Ready for {tourName} in {tourCity}
      </h2>
      <p className="text-gray-700">
        Embarking on the {tourName} tour in {tourCity} is an exciting journey
        that blends culture, history, and adventure. To make sure you have the
        best experience, here&apos;s everything you need to know before you go!
      </p>

      <h3 className="mt-1 text-lg font-medium">Important Documents</h3>
      <p className="text-gray-700">
        Double-check that your <strong>passport, visa, driver’s license</strong>
        , and any required travel documents are valid and easily accessible.
        It’s a good idea to make <strong>photocopies</strong> or keep{" "}
        <strong>digital copies</strong> on your phone or email for easy access
        in case of loss.
      </p>

      <h3 className="mt-1 text-lg font-medium">
        Medications & Health Essentials
      </h3>
      <p className="text-gray-700">
        Bring enough <strong>prescription medication</strong> to last throughout
        your {tourName} tour in {tourCity}, and carry it with you in case of
        luggage delays. A small kit of{" "}
        <strong>over-the-counter medicine</strong> (for headaches or digestion
        issues) can also come in handy.
      </p>

      <h3 className="mt-1 text-lg font-medium">Packing Smart</h3>
      <p className="text-gray-700">
        Lost luggage is common, so consider using a{" "}
        <strong>carry-on instead of a checked bag</strong> whenever possible. If
        you must check a bag, choose one with{" "}
        <strong>a standout color or clear identification</strong> to make it
        easy to spot. Pack a change of clothes in your <strong>carry-on</strong>{" "}
        just in case.
      </p>

      <h3 className="mt-1 text-lg font-medium">
        Security & Museum Restrictions
      </h3>
      <p className="text-gray-700">
        Many museums and attractions in {tourCity} restrict the size of bags
        that can be taken inside. Consider bringing a{" "}
        <strong>small shoulder bag or purse</strong> instead of a backpack to
        avoid any inconvenience.
      </p>

      <h3 className="mt-1 text-lg font-medium">Airplane Tips</h3>
      <p className="text-gray-700">
        Cabin pressure can sometimes cause ear discomfort or leaks in liquid
        containers. <strong>Use Ziploc bags</strong> for liquids to catch any
        spills, and consult your doctor for{" "}
        <strong>decongestion remedies</strong> if you’re prone to ear pressure
        issues.
      </p>

      <p className="mt-4 text-gray-700">
        A little preparation will make your {tourName} tour in {tourCity} much
        smoother—safe travels and enjoy your adventure!
      </p>
    </div>
  );
};

const StayingHealthy = ({ destinationName, countryName }) => {
  return (
    <div className="rounded-lg">
      <h2 className="mt-3 text-xl font-semibold">
        Staying Healthy While Traveling to {destinationName}
      </h2>

      {/* Health Recommendations */}
      <p className="text-gray-700">
        Your health and well-being are important while traveling to{" "}
        {destinationName}. To ensure a smooth and safe journey, we recommend
        consulting with your <strong>healthcare provider</strong> for any
        up-to-date health requirements. You can also check the latest travel
        health recommendations from:
      </p>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>
          <a
            href="https://www.who.int/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            <strong>World Health Organization (WHO)</strong>
          </a>
        </li>
      </ul>
      <p className="mt-2 text-gray-700">
        If any inoculations are required, your{" "}
        <strong>healthcare provider</strong> will document them on a valid
        vaccination certificate, which must be carried as proof where necessary.
      </p>

      {/* Preventative Health Tips */}
      <h3 className="mt-1 text-lg font-medium">
        Tips for Staying Healthy in {destinationName}
      </h3>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>Eat in moderation, especially when trying new foods.</li>
        <li>
          Be mindful of{" "}
          <strong>street food, salad bars, and raw vegetables</strong> unless
          they have thick peels like bananas or grapefruit.
        </li>
        <li>
          Drink <strong>bottled water</strong> and avoid consuming ice cubes
          made with tap water.
        </li>
        <li>
          Wash hands frequently and carry <strong>hand sanitizer</strong>.
        </li>
        <li>
          Bring <strong>sunscreen and insect repellent</strong> for protection
          in warm and active destinations.
        </li>
        <li>
          Pack a small <strong>first-aid kit</strong> with essential
          medications, including pain relievers, antacids, and cold medicine.
        </li>
      </ul>

      {/* Medical Considerations */}
      <h3 className="mt-1 text-lg font-medium">
        Medical Considerations for {destinationName}
      </h3>
      <p className="text-gray-700">
        If you have allergies to food, medication, or insect bites, consider
        wearing a <strong>medical alert bracelet</strong>
        and carrying a <strong>physician’s note</strong> detailing treatment
        instructions in case of emergency. It is also advisable to carry a list
        of medications, including <strong>dosage and generic names</strong>.
      </p>

      {/* Travel Illness Precautions */}
      <h3 className="mt-1 text-lg font-medium">
        What If You Get Sick While in {destinationName}?
      </h3>
      <p className="text-gray-700">
        If a traveler feels unwell upon arrival or during the tour in{" "}
        {destinationName}, they may be directed to a local or virtual
        <strong> medical facility</strong> for evaluation. To ensure the
        well-being of all passengers, they will only be able to rejoin the group
        after receiving written clearance from a{" "}
        <strong>medical professional</strong>.
      </p>
      <p className="mt-2 text-gray-700">
        Any additional costs related to{" "}
        <strong>
          medical treatment, extra hotel nights, or alternative transportation
        </strong>
        will be the responsibility of the traveler. Travel protection plans may
        cover these expenses if receipts from a{" "}
        <strong>legally qualified healthcare facility</strong> are provided.
      </p>

      {/* Country-Specific Health Advisory */}
      <h3 className="mt-1 text-lg font-medium">
        Health Advice for Traveling to {countryName}
      </h3>
      <p className="text-gray-700">
        No vaccinations are required for travel to {countryName}, but some may
        be recommended. Please consult your <strong>physician</strong> before
        departure. Authentic local cuisine is rich in flavor and spices, which
        may be difficult to digest for travelers unfamiliar with it. Consider
        easing into local dishes gradually.
      </p>
    </div>
  );
};

const TourEtiquette = ({ destinationName }) => {
  return (
    <div className="rounded-lg">
      <h2 className="mt-3 text-xl font-semibold">
        Considerations for Tour Participants in {destinationName}
      </h2>
      <p className="text-gray-700">
        To ensure a pleasant experience for all travelers, we kindly ask that
        tour participants be mindful of their fellow guests by following these
        guidelines while on the {destinationName} tour:
      </p>

      {/* Fragrance & Smoking Etiquette */}
      <h3 className="mt-1 text-lg font-medium">Courtesy & Personal Space</h3>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>
          Avoid wearing colognes, perfumes, or strong fragrances, as some
          travelers may have allergies.
        </li>
        <li>
          Refrain from smoking cigarettes, e-cigarettes, or cigars near fellow
          tour members, even in permitted outdoor areas.
        </li>
        <li>
          Smoking of any kind, including e-cigarettes and vaping devices, is
          strictly prohibited on all transportation during the {destinationName}{" "}
          tour.
        </li>
        <li>
          Be aware that {destinationName} may have strict regulations or bans on
          smoking, including e-cigarettes. Please check local laws before
          departure.
        </li>
      </ul>

      {/* Attire & Conversation Guidelines */}
      <h3 className="mt-1 text-lg font-medium">Respect for Fellow Travelers</h3>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>
          Avoid wearing attire with political or religious messages that could
          be considered offensive on your {destinationName} tour.
        </li>
        <li>
          Be mindful that guests come from diverse backgrounds. Refrain from
          discussing sensitive topics such as religion or politics.
        </li>
        <li>
          Keep conversations and mobile phone use to a minimum while the tour
          guide is providing commentary.
        </li>
      </ul>

      {/* Group Travel Etiquette */}
      <h3 className="mt-1 text-lg font-medium">Group Travel Etiquette</h3>
      <ul className="mt-2 list-disc pl-6 text-gray-700">
        <li>
          Follow the <strong>mandatory seat rotation policy</strong> on the tour
          coach during your {destinationName} trip.
        </li>
        <li>
          Use the available hand sanitizer on the coach to help maintain a clean
          and healthy environment.
        </li>
        <li>
          Ask for permission before taking photographs of fellow tour
          participants.
        </li>
        <li>
          Respect tour departure times to avoid delays and maximize sightseeing
          opportunities in {destinationName}.
        </li>
      </ul>

      <p className="mt-4 text-gray-700">
        By following these simple guidelines, we can ensure that everyone has an
        enjoyable and memorable travel experience in {destinationName}!
      </p>
    </div>
  );
};
