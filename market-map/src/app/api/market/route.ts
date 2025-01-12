import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

type Market = {
  시장명: string;
  시장유형: string[];
  소재지도로명주소: string;
  소재지지번주소: string;
  시장개설주기: string[];
  위도: number;
  경도: number;
  점포수: number;
  취급품목: string[];
  사용가능상품권: string;
  홈페이지주소: string;
  공중화장실보유여부: string;
  주차장보유여부: string;
  개설연도: string;
  전화번호: string;
  데이터기준일자: Date;
  제공기관코드: string;
  제공기관명: string;
};

export async function GET() {
  const data: Market[] = [];

  const file = await fs.readFile(path.join(process.cwd(), './data/market_20241107.csv'), 'utf8');
  file
    .split('\n')
    .slice(1, -1)
    .forEach((line) => {
      const [
        시장명,
        시장유형,
        소재지도로명주소,
        소재지지번주소,
        시장개설주기,
        위도,
        경도,
        점포수,
        취급품목,
        사용가능상품권,
        홈페이지주소,
        공중화장실보유여부,
        주차장보유여부,
        개설연도,
        전화번호,
        데이터기준일자,
        제공기관코드,
        제공기관명,
      ] = line.split(',');
      data.push({
        시장명,
        시장유형: 시장유형.split('+'),
        소재지도로명주소,
        소재지지번주소,
        시장개설주기: 시장개설주기.split('+'),
        위도: Number(위도),
        경도: Number(경도),
        점포수: Number(점포수),
        취급품목: 취급품목.split('+'),
        사용가능상품권,
        홈페이지주소,
        공중화장실보유여부,
        주차장보유여부,
        개설연도,
        전화번호,
        데이터기준일자: new Date(데이터기준일자),
        제공기관코드,
        제공기관명,
      });
    });

  return NextResponse.json({ data });
}
