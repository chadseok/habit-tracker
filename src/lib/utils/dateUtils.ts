import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { Day } from "interface/main";
import { ObjectifiedDate } from "interface/context";
import { PERIOD_CHANGE_OFFSET } from "constant";
dayjs.extend(isSameOrAfter);

const now = dayjs(new Date());

const dayNumToWord = (dayNum: number): Day => {
  switch (dayNum) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    default:
      throw new Error("dayjs의 day value가 0~6이 아닙니다.");
  }
};

const objectifyDate = (dateObj: dayjs.Dayjs): ObjectifiedDate => {
  return {
    year: dateObj.get("year"),
    month: dateObj.get("month") + 1,
    date: dateObj.get("date"),
    day: dateObj.get("day"),
    dayWord: dayNumToWord(dateObj.get("day")),
    hour: dateObj.get("hour"),
    minute: dateObj.get("minute"),
  };
};

export const getToday = () => {
  return objectifyDate(now);
};

export const getPeriod = (
  currentPeriodStart?: ObjectifiedDate,
  direction?: "prev" | "next"
) => {
  let targetDate;
  const current = !currentPeriodStart
    ? now
    : dayjs(
        new Date(
          currentPeriodStart.year,
          currentPeriodStart.month - 1,
          currentPeriodStart.date
        )
      );

  if (!direction) targetDate = current;
  else if (direction === "next")
    targetDate = current.add(PERIOD_CHANGE_OFFSET, "day");
  else targetDate = current.subtract(PERIOD_CHANGE_OFFSET, "day");

  const MondayOffset = targetDate.get("day") - 1;
  const SundayOffset = 7 - targetDate.get("day");

  return {
    start: objectifyDate(targetDate.subtract(MondayOffset, "day")),
    end: objectifyDate(targetDate.add(SundayOffset, "day")),
  };
};

export const isLatestWeek = (currentPeriodEnd: ObjectifiedDate) => {
  const endDate = dayjs(
    new Date(
      currentPeriodEnd.year,
      currentPeriodEnd.month - 1,
      currentPeriodEnd.date
    )
  );
  return endDate.isSameOrAfter(now);
};
