import { useEffect, useRef, useState } from 'react';
import TailSelect from '../ui/TailSelect'
import sarea from '../db/sarea.json';
import scode from '../db/scode.json';

const sensorKeys = ['pm10', 'co2', 'co', 'no2', 'no', 'nox', 'o3', 'pm25', 'fad'];

export default function Subway() {
  const areaRef = useRef(null);
  const [data, setData] = useState([]);
  const [tag, setTag] = useState();

  const getFetchData = async () => {
    // const KST = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().substring(0, 13).replaceAll('-', '').replace('T', '');
    const KST = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().substring(0, 10).replaceAll('-', '');
    const url = `http://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?serviceKey=${import.meta.env.VITE_DATA_API}&pageNo=1&numOfRows=12&resultType=json&controlnumber=${KST}&areaIndex=${areaRef.current.value}`;
    const resp = await fetch(url);
    const data = await resp.json();
    setData(data.response.body.items.item.sort((a, b) => a.controlnumber - b.controlnumber));
  }
  const formatDateTime = (number) => {
    const year = number.substring(0, 4);
    const month = number.substring(4, 6);
    const day = number.substring(6, 8);
    const hour = number.substring(8, 10);

    return `${year}.${month}.${day} ${hour}시`;
  }
  useEffect(() => {
    if (!data)
      return;
    const tags = data.map(item =>
      <tr key={item + item.controlnumber} className='border border-emerald-600 font-bold h-10'>
        <td className='border border-emerald-600'>{formatDateTime(item.controlnumber)}</td>
        {sensorKeys.map(key => (
          <td key={key} className='border border-emerald-600'>
            {item[key]}{item[key] !== '-' ? scode[key]['unit'] : ''}
          </td>
        ))}
      </tr>
    )
    setTag(tags);
  }, [data]);

  return (
    <div className='w-9/10'>
      <div className="grid grid-cols-2 gap-4  my-10">
        <div className='flex font-bold text-2xl items-center justify-center'>측정소 선택</div>
        <TailSelect selectRef={areaRef} caption="측정소" keys={sarea.map(item => item['코드'])} values={sarea.map(item => item['측정소'])} onChange={getFetchData} />
      </div>
      <table className='w-full mb-10'>
        <thead className='bg-emerald-600 text-center text-white font-bold'>
          <tr className='border border-white h-20'>
            <td className='border border-white'>시간</td>
            <td className='border border-white'>미세먼지<br />(pm10)</td>
            <td className='border border-white'>이산화탄소<br />(co2)</td>
            <td className='border border-white'>일산화탄소<br />(co)</td>
            <td className='border border-white'>이산화질소<br />(no2)</td>
            <td className='border border-white'>일산화질소<br />(no)</td>
            <td className='border border-white'>질소산화물<br />(nox)</td>
            <td className='border border-white'>오존<br />(o3)</td>
            <td className='border border-white'>초미세먼지<br />(pm25)</td>
            <td className='border border-white'>폼알데하이드<br />(fad)</td>
          </tr>
        </thead>
        <tbody className='text-center'>
          {tag}
        </tbody>
      </table>
    </div>
  )
}
