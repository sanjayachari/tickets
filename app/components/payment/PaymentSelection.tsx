import type React from "react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Building2, CreditCardIcon, Wallet2Icon } from "lucide-react";

interface PaymentOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode | string;
  disabled?: boolean;
  iconType?: "image" | "icon";
  gateway: "payu" | "razorpay";
  subtext: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: "upi",
    title: "Pay Using UPI",
    description: "Pay Directly From Your Bank Account",
    iconType: "image",
    icon: "https://storage.googleapis.com/images.staybook.in/upi_paymode.png",
    gateway: "payu",
    subtext: "",
  },
  {
    id: "cards",
    title: "Cards",
    description: "Visa, Mastercard, Rupay & more",
    iconType: "icon",
    icon: <CreditCardIcon className="h-6 w-6 text-blue-600" />,
    gateway: "razorpay",
    subtext: "For users in India only",
  },
  {
    id: "netbanking",
    title: "Net Banking",
    description: "40+ Banks Available",
    iconType: "icon",
    icon: <Building2 className="h-6 w-6 text-blue-600" />,
    gateway: "payu",
    subtext: "",
  },
  {
    id: "wallets",
    title: "Wallets, Gift Cards & more",
    description: "Pay with your preferred wallet",
    iconType: "icon",
    icon: <Wallet2Icon className="h-6 w-6 text-blue-600" />,
    gateway: "payu",
    subtext: "",
  },
];

interface PaymentSelectionProps {
  onClick(gateway: string): void;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  selectedOption: string;
}

export default function PaymentSelection(props: PaymentSelectionProps) {
  const handlePaymentSelect = (optionId: string, gateway: string) => {
    props.onClick(gateway);
  };


  return (
    <div className="h-fit">
      <div className="mx-auto">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-lg font-semibold text-gray-900">
              Payment Methods
            </h1>
          </div>

          <div className="divide-y divide-gray-200" id="payment-selection">
            {paymentOptions.map((option, index) => (
              <div key={option.id}>
                <div
                  // transition={{ duration: 0.15 }}
                  className={`flex cursor-pointer items-center justify-between px-6 py-4 ${props.selectedOption === option.id ? "border-l-4 border-l-blue-500 bg-blue-50" : ""}`}
                  onClick={() => handlePaymentSelect(option.id, option.gateway)}
                >
                  <div className="flex items-center gap-4">
                    {option.iconType === "image" ? (
                      <img
                        className="h-8 w-8"
                        src={option.icon + ""}
                        alt="icon"
                      />
                    ) : (
                      <div className="flex-shrink-0">{option.icon}</div>
                    )}

                    <div>
                      <h3
                        className={`font-semibold ${option.disabled ? "text-gray-500" : "text-gray-900"}`}
                      >
                        {option.title}
                      </h3>
                      <p
                        className={`text-sm ${option.disabled ? "text-gray-500" : "text-gray-600"}`}
                      >
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
