// import { PlanDetails } from "@/lib/classModels/bookings/planDetails";
import { PlanDetails } from "@/app/classes/bookings/planDetails";
import { removeTour } from "@/app/lib/redux/tourBookingSlice";
import { XIcon } from "lucide-react";
// import { removeTour } from "@/lib/redux/tourBookingSlice";
// import { XIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";

interface TourPlanTileProp {
  pIndex: number;
  ppInfo: PlanDetails;
}

export const TourPlanTile = ({ ppInfo, pIndex }: TourPlanTileProp) => {
  const dispatch = useDispatch();

  const removePlanHandler = () => {
    dispatch(removeTour({ planIdx: pIndex }));
  };

  return (
    <div className="flex flex-row rounded-md border-[1px] border-gray-300">
      <div className="flex w-full flex-col py-1.5 pl-1.5">
        <p className="text-md line-clamp-1 font-semibold text-gray-500">
          {ppInfo.plan_Title}
        </p>
        <div className="flex space-x-1.5">
          <p className="text-md flex items-center align-middle">
            <strong className="text-md mr-1">{ppInfo.total_Plan_Count}</strong>
            <span className="">
              {ppInfo.total_Plan_Count > 1 ? "Plans, " : "Plan, "}{" "}
            </span>
          </p>
          {ppInfo.total_Adult_Count > 0 && (
            <p className="text-md flex items-center align-middle">
              <strong className="text-md mr-1">
                {ppInfo.total_Adult_Count}
              </strong>
              <span className="">
                {ppInfo.total_Adult_Count > 1 ? "Adults" : "Adult"}
              </span>
            </p>
          )}
          {ppInfo.total_Child_Count > 0 && (
            <p className="text-md flex items-center align-middle">
              <strong className="text-md mr-1">
                {ppInfo.total_Child_Count}
              </strong>
              <span className="">
                {ppInfo.total_Child_Count > 1 ? "Children" : "Child"}
              </span>
            </p>
          )}
        </div>
      </div>
      <button
        className="rounded-r-md bg-primary p-1"
        onClick={removePlanHandler}
      >
        <XIcon className="m-auto h-5 w-5 fill-white" />
      </button>
    </div>
  );
};
