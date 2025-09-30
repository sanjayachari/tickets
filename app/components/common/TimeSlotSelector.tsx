// import { convertTo12HourFormat } from "@/src/utils";
// import { useOutsideClick } from "@/hooks/useOutsideClick";
import { ChevronDown } from "lucide-react";
import React, { use, useEffect, useRef, useState } from "react";
// import { getUpcomingTimeSlots } from "@/src/utils";
import { convertTo12HourFormat } from "@/app/lib/utils/convertTo12HourFormat/convertTo12HourFormat";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { getUpcomingTimeSlots } from "@/app/lib/utils/getUpcomingTimeSlots/getUpcomingTimeSlots";

interface TimeSlotSelectorProps {
  slots: string[];
  onSelect: (slot: string) => void;
  label?: string;
  defaultOpen?: boolean;
  setSlotModel: any;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  slots,
  onSelect,
  label,
  defaultOpen,
  setSlotModel,
}) => {
  const slotRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setIsOpen(defaultOpen ?? false);
  }, [defaultOpen]);

  // Close the dropdown when the user clicks outside of it
  useOutsideClick({
    ref: slotRef,
    callback: () => {
      setIsOpen(false);
      setSlotModel(false);
    },
  });

  const handleSelect = (slot: string) => {
    const selectedSlot = convertTo12HourFormat(slot);
    setSelected(selectedSlot);
    setIsOpen(false);
    setSlotModel(false);
    onSelect(slot);
  };

  return (
    <div ref={slotRef} id="time-slot-selector" className="relative w-full">
      <label className="ml-2 block text-sm">
        {label || "Select a time slot"} <sup className="text-red-700">*</sup>
      </label>
      <button
        type="button"
        onClick={() => {
          setIsOpen((open) => !open);
          setSlotModel((open: boolean) => !open);
        }}
        className="inline-flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 p-2 text-sm shadow-sm hover:bg-secondary/5"
      >
        {selected || "Choose..."}
        <span style={{ float: "right" }}>
          <ChevronDown
            className={`h-4 w-4 transition-all ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>

        {isOpen && (
          <ul className="absolute max-h-[200px] w-full overflow-y-auto rounded-lg border border-gray-300 bg-white p-2 shadow-sm">
            {(() => {
              const upcomingSlots = slots
                .map((slot) => ({ original: slot, display: getUpcomingTimeSlots(slot) }))
                .filter(({ display }) => display !== null);

              if (upcomingSlots.length === 0) {
                return (
                  <li className="cursor-not-allowed rounded-md p-2 text-center bg-red-400 text-white">
                    Sold Out
                  </li>
                );
              }

              return upcomingSlots.map(({ original, display }) => (
                <li
                  key={original}
                  onClick={() => handleSelect(original)}
                  className="cursor-pointer rounded-md p-2 transition-transform hover:scale-[1.02] hover:bg-secondary/5"
                >
                  {display}
                </li>
              ));
            })()}
          </ul>
        )}
    </div>
  );
};

export default TimeSlotSelector;
