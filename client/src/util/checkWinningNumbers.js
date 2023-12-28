function generateLotteryNumbers() {
  const candidateNumbers = Array.from({ length: 45 }, (_, index) => index + 1);
  let lotteryNumbers = [];

  // 6개의 일반 번호 랜덤 선택
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * candidateNumbers.length);
    const selectedNumber = candidateNumbers[randomIndex];

    // 선택한 번호를 결과 배열에 추가
    lotteryNumbers.push(selectedNumber);

    // 선택한 번호를 후보 번호 배열에서 제거 (splice 대신 swap 활용)
    [
      candidateNumbers[randomIndex],
      candidateNumbers[candidateNumbers.length - 1],
    ] = [
      candidateNumbers[candidateNumbers.length - 1],
      candidateNumbers[randomIndex],
    ];

    // 후보 번호 배열 크기 감소
    candidateNumbers.pop();
  }

  // 보너스 번호 생성 (이미 선택된 번호와 중복되지 않도록)
  let bonusNumber;

  do {
    bonusNumber = Math.floor(Math.random() * candidateNumbers.length) + 1;
  } while (lotteryNumbers.includes(bonusNumber));

  // 결과 배열에 보너스 번호 추가
  lotteryNumbers.push(bonusNumber);

  return lotteryNumbers;
}

// 더 이상 사용하지 않는 함수
export default function checkWinningNumbers(targetNumbers) {
  let attempts = 0;

  for (;;) {
    const generatedNumbers = generateLotteryNumbers();
    attempts++;

    // 1등 당첨 여부 확인
    const matchingNumbers = targetNumbers.filter((num) =>
      generatedNumbers.includes(num)
    );
    const isJackpot = matchingNumbers.length === 6;

    if (isJackpot) {
      console.log("1등에 당첨되었습니다!");
      console.log(
        "당첨 번호:",
        generatedNumbers.slice(0, 6).sort((a, b) => a - b),
        "보너스 번호:",
        generatedNumbers[6]
      );
      break;
    }
  }

  return attempts;
}

// // // 최신 회차의 복권 당첨 번호
// const latestWinningNumbers = [1, 2, 3, 4, 5, 6, 7];

// // // checkWinningNumbers 함수 호출 및 결과 출력
// const attempts = checkWinningNumbers(latestWinningNumbers);
// console.log("1등에 당첨되기까지 시도한 횟수:", attempts);
