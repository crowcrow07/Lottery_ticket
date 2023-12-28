import Button from "../../ui/Button";

import styles from "./WinCheckButton.module.css";

export default function WinCheckButton({ isCalOver, winningButtonHandler }) {
  return (
    <div className={`${styles["button-container"]}`}>
      <Button onClick={winningButtonHandler} disabled={isCalOver}>
        {!isCalOver ? "당첨 돼보기" : "계산중..."}
      </Button>
    </div>
  );
}
