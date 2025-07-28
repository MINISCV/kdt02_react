import { useEffect, useRef, useState } from 'react';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import TailSelect from '../ui/TailSelect'
import SubwayBox from './SubwayBox';
import sarea from '../db/sarea.json';

export default function Subway() {
  const areaRef = useRef(null);
  const [data, setData] = useState([]);
  const [tag, setTag] = useState();
  const [chartData, setChartData] = useState([]);

  const getFetchData = async () => {
    // const KST = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().substring(0, 13).replaceAll('-', '').replace('T', '');
    const KST = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().substring(0, 10).replaceAll('-', '');
    const url = `https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?serviceKey=${import.meta.env.VITE_DATA_API}&pageNo=1&numOfRows=12&resultType=json&controlnumber=${KST}&areaIndex=${areaRef.current.value}`;
    const resp = await fetch(url);
    const data = await resp.json();
    setData(data.response.body.items.item.sort((a, b) => a.controlnumber - b.controlnumber));
  }

  useEffect(() => {
    if (!data)
      return;
    const tags = data.map((item, idx) =>
      <SubwayBox key={item + item.controlnumber} item={item} idx={idx} />
    )
    setTag(tags);
    let cData = [];
    data.map(item =>
      cData.push({ Date: `${item.controlnumber.substring(8, 10)}시`, "pm10": item.pm10, "co2": item.co2, "co": item.co, "no2": item.no2, "no": item.no, "nox": item.nox, "o3": item.o3, "pm25": item.pm25, "fad": item.fad })
    )
    setChartData(cData);
  }, [data]);


  const MyChart = () => {
    if (chartData.length === 0) {
        return ;
    }
    return <div className='w-8/10 h-120 flex justify-center mx-auto'>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} >
          <CartesianGrid />
          <XAxis dataKey="Date" interval={0} />
          <YAxis yAxisId="dust" orientation="left" stroke="#8884d8" unit="µg/m³" width={80} />
          <YAxis yAxisId="gas" orientation="right" stroke="#82ca9d" unit="ppm" width={80} />
          <Line yAxisId="dust" dataKey="pm10" stroke="#FF5733" />
          <Line yAxisId="gas" dataKey="co2" stroke="#33FF57" />
          <Line yAxisId="gas" dataKey="co" stroke="#3357FF" />
          <Line yAxisId="gas" dataKey="no2" stroke="#FF33FF" />
          <Line yAxisId="gas" dataKey="no" stroke="#FFFF33" />
          <Line yAxisId="gas" dataKey="nox" stroke="#33FFFF" />
          <Line yAxisId="gas" dataKey="o3" stroke="#FF3333" />
          <Line yAxisId="dust" dataKey="pm25" stroke="#8A2BE2" />
          <Line yAxisId="dust" dataKey="fad" stroke="#FFD700" />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  };
  return (
    <div className='w-9/10'>
      <div className="grid grid-cols-2 gap-4  my-10">
        <div className='flex font-bold text-2xl items-center justify-center'>측정소 선택</div>
        <TailSelect selectRef={areaRef} caption="측정소" keys={sarea.map(item => item['코드'])} values={sarea.map(item => item['측정소'])} onChange={getFetchData} />
      </div>
      {MyChart()}
      {tag}
    </div>
  )
}
