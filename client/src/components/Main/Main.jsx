import { useEffect, useState } from "react";

import LotteryNumberSearch from "./LotteryNumberSearch";
import WinCheckButton from "./WinCheckButton";
import LotteryNumberDisplay from "./LotteryNumberDisplay";

import DhLotteryApi from "../../api/DhLotteryApi";
import calCurrentWeek from "../../util/calCurrentWeek";
import { checkWinningNumbersWorker } from "../../util/util.worker";

import styles from "./Main.module.css";

const initialData = {
  drwNo: 0,
  drwNoDate: "2023-06-18",
  firstAccumamnt: 0,
  drwtNo1: 1,
  drwtNo2: 2,
  drwtNo3: 3,
  drwtNo4: 4,
  drwtNo5: 5,
  drwtNo6: 6,
  bnusNo: 7,
  returnValue: "fail",
};

export default function Main() {
  const [data, setData] = useState(initialData);
  const [isCalOver, setIsCalOver] = useState(false);
  const [attempt, setAttempt] = useState(null);

  const currentWeek = calCurrentWeek();

  const fetchData = async (num) => {
    try {
      const result = await DhLotteryApi(num);
      setData((prevData) => ({
        ...prevData,
        drwNo: result.drwNo,
        drwNoDate: result.drwNoDate,
        firstAccumamnt: result.firstAccumamnt,
        drwtNo1: result.drwtNo1,
        drwtNo2: result.drwtNo2,
        drwtNo3: result.drwtNo3,
        drwtNo4: result.drwtNo4,
        drwtNo5: result.drwtNo5,
        drwtNo6: result.drwtNo6,
        bnusNo: result.bnusNo,
        returnValue: result.returnValue,
      }));
      setAttempt(null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentWeek);
  }, [currentWeek]);

  const winningButtonHandler = () => {
    setIsCalOver(true);

    const dhLottoNumArr = [
      data.drwtNo1,
      data.drwtNo2,
      data.drwtNo3,
      data.drwtNo4,
      data.drwtNo5,
      data.drwtNo6,
      data.bnusNo,
    ];

    checkWinningNumbersWorker.onmessage = ({ data }) => {
      const attempts = data;
      setAttempt(attempts);
      setIsCalOver(false);
    };

    checkWinningNumbersWorker.postMessage(dhLottoNumArr);
  };

  return (
    <main>
      <nav>
        <h1>나는 복권 1등할려면 몇장을 샀어야했나</h1>
      </nav>
      <section className={styles["lottery-draw"]}>
        <LotteryNumberSearch
          onFetchData={fetchData}
          currentWeek={currentWeek}
        />
        <WinCheckButton
          isCalOver={isCalOver}
          winningButtonHandler={winningButtonHandler}
        />
        <LotteryNumberDisplay
          data={data && data.returnValue === "success" ? data : null}
          attempt={attempt ?? null}
        />
      </section>
    </main>
  );
}

/* 
  1등 당첨 돼보기 버튼 -> 계산하고 결과화면으로 이동
  몇장을 샀는지를 보여줘야 하고 얼마가 들어갔는지도 보여주기
  -> 이번 number 회차의 복권에서 당신은 총 number 개의 복권을 사야했으며 number 원을 투자했어야 했습니다.
  공유 버튼 : 인스타 스토리 공유, 카카오톡 공유, 클립보드 복사버튼
*/
