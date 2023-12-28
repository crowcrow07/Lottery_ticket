import TestWorker from "../workers/test.worker?worker";
import CheckWinningNumbersWorker from "../workers/checkWinningNumbers.worker?worker";

export const testWorker = new TestWorker();
export const checkWinningNumbersWorker = new CheckWinningNumbersWorker();
