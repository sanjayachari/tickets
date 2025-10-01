import CountryList from "country-list-with-dial-code-and-flag";
import React, { useState, useRef, useEffect } from "react";

interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

interface PhoneInputProps {
  value: string;
  onChanged: (number: string, country: any) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  formErrors: { [key: string]: string };
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  id?: string;
}

const topCountries = ["IN", "US", "TH", "SG", "MY", "PH"];

export function PhoneInput({
  value,
  onChanged,
  placeholder = "Phone number",
  className = "",
  formErrors,
  onBlur,
  id,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentCountry, setCurrentCountry] = useState<Country>({
    name: "India",
    code: "IN",
    dialCode: "+91",
    flag: "🇮🇳",
  });

  // When searchQuery is empty, show all countries for alphabetical listing
  const allCountries = CountryList.getAll();

  // If search query is non-empty, perform searches; else, use all countries
  const filteredCountries =
    searchQuery.trim().length > 0
      ? Array.from(
          new Set([
            ...CountryList.findByCountryCode(searchQuery),
            ...CountryList.findByDialCode(searchQuery),
            ...CountryList.findByKeyword(searchQuery),
          ]),
        )
      : allCountries;

  // Exclude top countries from alphabeticalCountries to avoid duplication (optional)
  const alphabeticalCountries = filteredCountries.filter(
    (country) => !topCountries.includes(country.code),
  );

  // Group countries by first letter for alphabeticalCountries
  const groupedCountries = alphabeticalCountries.reduce(
    (acc, country) => {
      const firstLetter = country.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(country);
      return acc;
    },
    {} as Record<string, Country[]>,
  );

  const topCountriesList = CountryList.getAll().filter((country) =>
    topCountries.includes(country.code),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (country: Country) => {
    setCurrentCountry(country);
    setIsOpen(false);
    setSearchQuery("");
    onChanged(value, country);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Remove any non-numeric characters except spaces and dashes
    const cleanedValue = inputValue.replace(/[^\d\s-]/g, "");
    onChanged(cleanedValue, currentCountry);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="relative block text-sm font-medium text-red-500" id={id}>
        <span className="leading-0 absolute -top-2.5 left-0 z-10 ml-3 flex items-center text-gray-700 bg-white px-1 text-sm">
          Phone Number <sup className="text-red-700">*</sup>
        </span>

        <div
          className={`relative overflow-hidden rounded-md border transition-colors ${
            isOpen ? "" : "border-gray-300 focus-within:border-teal-500"
          }`}
        >
          <div className="flex">
            {/* Country Code Selector */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 border-0 border-gray-300 px-3 py-3 transition-colors"
            >
              <span className="font-medium text-gray-700">
                ({currentCountry.dialCode})
              </span>
              <svg
                className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Phone Number Input */}
            <input
              ref={inputRef}
              type="tel"
              onBlur={onBlur}
              value={value}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="flex-1 rounded-r-lg border-0 border-l-0 px-4 py-2 text-base text-gray-900 placeholder-gray-400 focus:border-l-0 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        {formErrors.phoneNumber ||
          (formErrors.phone && (
            <span className="p-1 text-xs font-medium tracking-wide text-red-800">
              {formErrors.phoneNumber || formErrors.phone}
            </span>
          ))}
      </label>

      {/* Dropdown */}
      {isOpen && (
        <div className="container-snap absolute bottom-16 left-0 right-0 z-50 h-fit rounded-lg border bg-white shadow-lg">
          {/* Selected Country */}
          <div className="border-b border-gray-100 p-4">
            <div className="mb-2 text-sm text-gray-500">Selected</div>
            <div className="flex items-center justify-between rounded-lg bg-blue-50 p-2">
              <div className="flex items-center gap-3">
                <span className="text-lg">{currentCountry.flag}</span>
                <span className="font-medium text-gray-900">
                  {currentCountry.name}
                </span>
                <span className="text-gray-600">{currentCountry.dialCode}</span>
              </div>
              <svg
                className="h-5 w-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Search */}
          <div className="border-b border-gray-100 p-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Country or region"
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="h-[200px] overflow-y-auto">
            {!searchQuery && (
              <>
                {/* Top Countries */}
                <div className="">
                  <div className="mb-1 w-full bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900">
                    Top
                  </div>
                  <div className="space-y-1 px-2">
                    {topCountriesList.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className="flex w-full items-center gap-3 rounded-lg p-1 text-left transition-colors hover:bg-gray-50"
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span className="flex-1 text-gray-900">
                          {country.name}
                        </span>
                        <span className="text-gray-500">
                          {country.dialCode}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Alphabetical Countries */}
            {Object.keys(groupedCountries)
              .sort()
              .map((letter) => (
                <div key={letter} className="">
                  <div className="mb-1 w-full bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900">
                    {letter}
                  </div>
                  <div className="space-y-1 px-2">
                    {groupedCountries[letter].map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className="flex w-full items-center gap-3 rounded-lg p-1 text-left transition-colors hover:bg-gray-50"
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span className="flex-1 text-gray-900">
                          {country.name}
                        </span>
                        <span className="text-gray-500">
                          {country.dialCode}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

            {filteredCountries.length === 0 && searchQuery && (
              <div className="p-2 text-center text-gray-500">
                No countries found matching {searchQuery}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
