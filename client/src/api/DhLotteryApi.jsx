const MY_SERVER_URL = "http://localhost:4000/getData";

export default async function DhLotteryApi(number) {
  const LOTTERY_API_URL = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${number}`;

  try {
    const response = await fetch(MY_SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: LOTTERY_API_URL,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
