import { useEffect, useState } from "react";

import DhLotteryApi from "../../api/DhLotteryApi";
import calCurrentWeek from "../../util/calCurrentWeek";

import styles from "./Main.module.css";
import LotteryNumberSearch from "./LotteryNumberSearch";
import LotteryNumberDisplay from "./LotteryNumberDisplay";
import { checkWinningNumbersWorker } from "../../util/util.worker";

const initialData = {
  drwNo: 0,
  drwNoDate: "2023-06-18",
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

  const fetchData = async (num) => {
    try {
      const result = await DhLotteryApi(num);
      setData((prevData) => ({
        ...prevData,
        drwNo: result.drwNo,
        drwNoDate: result.drwNoDate,
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

  const currentWeek = calCurrentWeek();

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

    // 웹 워커에서 한 번만 이벤트 핸들러 등록
    checkWinningNumbersWorker.onmessage = ({ data }) => {
      const attempts = data;
      setAttempt(attempts);

      // 작업이 완료된 후 다시 메시지를 받지 않도록 이벤트 핸들러 제거
      // checkWinningNumbersWorker.onmessage = null;

      // 모든 작업이 완료되었으므로 setIsCalOver(false) 호출
      setIsCalOver(false);
    };

    // 웹 워커에 메시지 전송
    checkWinningNumbersWorker.postMessage(dhLottoNumArr);
  };

  return (
    <main>
      <nav>
        <h1>나는 복권 1등할려면 몇장을 샀어야했나</h1>
      </nav>
      <section className={styles["lottery-draw"]}>
        {/* 
        https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=+number
        조회하기 -> dropdown 형식으로? 처음부터 끝까지 보여주기 보다는 최근부터 10회 전까지만 불러오기 / 조회하기 버튼
        밑에 자그만한게 설명 (최신 회차에서 10주전까지의 기록을 조회합니다.)
        number 회차 : 복권 번호 7자리 나열 (기본값은 가장 최근껄로)

        1등 당첨 돼보기 버튼 -> 계산하고 결과화면으로 이동

        몇장을 샀는지를 보여줘야 하고 얼마가 들어갔는지도 보여주기
        -> 이번 number 회차의 복권에서 당신은 총 number 개의 복권을 사야했으며 number 원을 투자했어야 했습니다.
        공유 버튼 : 인스타 스토리 공유, 카카오톡 공유, 클립보드 복사버튼
일주일마다 한번 api를 호출하는 번호를 + 1 하면 될듯
                
        */}

        {/* {console.log(
          "화면 : ",
          data && data.returnValue === "success" ? data : null
        )} */}
        <LotteryNumberSearch
          onFetchData={fetchData}
          currentWeek={currentWeek}
        />
        <div className={`${styles["button-container"]}`}>
          <button
            className={isCalOver && styles.disabled}
            type="button"
            onClick={winningButtonHandler}
            disabled={isCalOver}
          >
            {!isCalOver ? "당첨 돼보기" : "계산중..."}
          </button>
        </div>
        <LotteryNumberDisplay
          data={data && data.returnValue === "success" ? data : null}
          attempt={attempt ?? null}
        />
      </section>
    </main>
  );
}
