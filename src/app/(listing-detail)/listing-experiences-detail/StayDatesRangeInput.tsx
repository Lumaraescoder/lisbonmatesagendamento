"use client";

import React, { Fragment, useState, FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePicker from "react-datepicker";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
import converSelectedDateToString from "@/utils/converSelectedDateToString";

export interface StayDatesRangeInputProps {
  className?: string;
  single?: boolean;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "flex-1",
  single = false,
}) => {
  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const [startDate, setStartDate] = useState<Date | null>(startOfToday);
  const [endDate, setEndDate] = useState<Date | null>(startOfToday);
  const isSingle = !!single;
  //

  const onChangeDate = (dates: any) => {
    if (isSingle) {
      const d = dates as Date | null;
      setStartDate(d);
      setEndDate(d);
      return;
    }
    const [start, end] = dates as [Date | null, Date | null];
    setStartDate(start);
    setEndDate(end);
  };

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {converSelectedDateToString(isSingle ? startDate : [startDate, endDate]) || "Add dates"}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {isSingle ? "" : "Check in - Check out"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`StayDatesRangeInput z-10 relative flex ${className}`}>
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`flex-1 flex relative p-3 items-center space-x-3 focus:outline-none ${
              open ? "shadow-lg" : ""
            }`}
          >
            {renderInput()}
            {startDate && open && (
              <ClearDataButton onClick={() => onChangeDate(single ? null : [null, null])} />
            )}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-auto xl:-right-10 right-0 z-10 mt-3 top-full w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                <DatePicker
                  selected={startDate}
                  onChange={(dates) => {
                    onChangeDate(dates);
                    const rangeComplete = Array.isArray(dates) && Boolean(dates[1]);
                    if ((isSingle && dates) || rangeComplete) {
                      close();
                    }
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange={!isSingle}
                  monthsShown={isSingle ? 1 : 2}
                  showPopperArrow={false}
                  inline
                  minDate={new Date(new Date().setHours(0,0,0,0))}
                  showDisabledMonthNavigation
                  renderCustomHeader={(p) => (
                    <DatePickerCustomHeaderTwoMonth {...p} />
                  )}
                  renderDayContents={(day, date) => (
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  )}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default StayDatesRangeInput;
