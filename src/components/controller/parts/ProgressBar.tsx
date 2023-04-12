import { useHabits } from "contexts/HabitContext";

const ProgressBar = () => {
  const habits = useHabits();
  const weeklyChecksLength = habits.reduce(
    (prev, curr) => prev + curr.days.length,
    0
  );
  //  금주 체그 한 개수는 임시로 생성
  const tempAchieveChecksLength = weeklyChecksLength > 5 ? 5 : 0;

  const achieveRate = !weeklyChecksLength
    ? "0%"
    : Math.ceil((tempAchieveChecksLength / weeklyChecksLength) * 100) + "%";

  return (
    <div
      style={{
        width: "50vw",
        backgroundColor: "lightgray",
      }}
    >
      <div
        style={{
          width: achieveRate,
          height: "3vh",
          backgroundColor: "cyan",
          textAlign: "center",
          lineHeight: "3vh",
        }}
      >
        {achieveRate}
      </div>
    </div>
  );
};

export default ProgressBar;
