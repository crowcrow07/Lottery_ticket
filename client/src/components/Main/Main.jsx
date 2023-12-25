import { useEffect, useState } from "react";

import DhLotteryApi from "../../api/DhLotteryApi";
import calCurrentWeek from "../../util/calCurrentWeek";

import styles from "./Main.module.css";
import PastTenDrawsViewer from "./PastTenDrawsViewer";
import LotteryNumberDisplay from "./LotteryNumberDisplay";

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const currentWeek = calCurrentWeek();

  useEffect(() => {
    fetchData(currentWeek);
  }, [currentWeek]);

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
        {console.log(
          "화면 : ",
          data && data.returnValue === "success" ? data : null
        )}
        <PastTenDrawsViewer onFetchData={fetchData} currentWeek={currentWeek} />
        <LotteryNumberDisplay />
        <div className={styles["button-container"]}>
          <button>당첨돼보기</button>
        </div>
      </section>
    </main>
  );
}
