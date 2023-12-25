import { useState } from "react";
import styles from "./PastTenDrawsViewer.module.css";

export default function PastTenDrawsViewer({ onFetchData, currentWeek }) {
  const [inputValue, setInputValue] = useState("");
  const [isValidLotteryNumber, setIsValidLotteryNumber] = useState(true);
  const [infoText, setInfoText] = useState(
    `현재 1부터 ${currentWeek}까지 조회 가능`
  );

  onFetchData = onFetchData ?? console.log("함수 전달이 안됐습니다.");
  currentWeek = currentWeek ?? 1099;

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const inputKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      searchButtonHandler();
    }
  };

  const isInputValid = (value) => {
    let isValid = true;

    if (!value.trim().length) {
      setInfoText(`TIP : 최신 회차는 ${currentWeek}입니다.`);
      isValid = false;
    } else if (isNaN(Number(value))) {
      setInfoText(`TIP : 숫자만 입력해주세요!`);
      isValid = false;
    } else if (value < 1 || currentWeek < value) {
      setInfoText(`TIP : 1부터 ${currentWeek}까지만 가능합니다.`);
      isValid = false;
    }

    return isValid;
  };

  const searchButtonHandler = () => {
    const isValid = isInputValid(inputValue);
    setIsValidLotteryNumber(isValid);
    setInputValue("");

    if (isValid) {
      onFetchData(inputValue);
    }
  };

  const placeholderText = `1 ~ ${currentWeek}`;

  return (
    <div className={styles.container}>
      <h2>복권번호 조회</h2>
      <div className={styles["input-container"]}>
        <input
          min={1}
          max={currentWeek}
          maxLength={4}
          onChange={inputChangeHandler}
          onKeyDown={inputKeyDownHandler}
          value={inputValue}
          placeholder={placeholderText}
        />
        <button onClick={searchButtonHandler}>조회</button>
      </div>
      <span className={!isValidLotteryNumber && styles.redText}>
        {infoText}
      </span>
    </div>
  );
}
