// 초기 주차 정보와 마지막으로 업데이트된 시간
// let currentWeek = 1099;
// let lastUpdateTime = new Date("2023-12-23T22:00:00"); // 12월 23일 토요일 22:00:00

// 일주일이 지날 때마다 회차 정보를 계산하는 함수
export default function calCurrentWeek(currentWeek, lastUpdateTime) {
  currentWeek = currentWeek ?? 1099;
  lastUpdateTime = lastUpdateTime ?? new Date("2023-12-23T22:00:00");

  const currentTime = new Date();
  const elapsedMilliseconds = currentTime - lastUpdateTime;
  const elapsedDays = Math.floor(elapsedMilliseconds / (24 * 60 * 60 * 1000));

  if (elapsedDays >= 7) {
    currentWeek += Math.floor(elapsedDays / 7); // 일주일이 넘는 만큼 주차 정보를 업데이트
    // lastUpdateTime = currentTime; // 마지막 업데이트 시간을 현재 시간으로 갱신
    console.log("주차 정보 업데이트:", currentWeek);
  }
  return currentWeek;
}
