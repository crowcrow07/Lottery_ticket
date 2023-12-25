export default function DhLotteryApi(number) {
  fetch(
    `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=+${number}`
  )
    .then((res) => {
      res.json();
    })
    .then((json) => console.log(json));
}
