import numberToKorean from "../../util/numberToKorean";

import styles from "./LotteryNumberDisplay.module.css";

export default function LotteryNumberDisplay({ data, attempt }) {
  if (!data) {
    return <div>서버와 통신할수없습니다.</div>;
  }
  const {
    bnusNo,
    drwNo,
    drwNoDate,
    drwtNo1,
    drwtNo2,
    drwtNo3,
    drwtNo4,
    drwtNo5,
    drwtNo6,
  } = data;

  const lotteryNumberArr = [];

  lotteryNumberArr.push(
    drwtNo1,
    drwtNo2,
    drwtNo3,
    drwtNo4,
    drwtNo5,
    drwtNo6,
    bnusNo
  );

  return (
    <div className={styles.container}>
      <div className={styles["info-container"]}>
        <div>
          {attempt
            ? `${numberToKorean(attempt)}장을 사야 합니다.`
            : `${drwNo} 회차`}
        </div>
        <div>
          {attempt
            ? `${numberToKorean(attempt * 1000)}원을 투자해야합니다.`
            : `${drwNoDate}에 추첨됨`}
        </div>
      </div>
      <div className={styles["lottery-number-container"]}>
        {lotteryNumberArr.map((v) => {
          return (
            <div className={styles["lottery-number"]} key={v}>
              {v}
            </div>
          );
        })}
      </div>
    </div>
  );
}
