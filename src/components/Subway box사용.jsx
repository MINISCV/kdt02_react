import { useEffect, useRef, useState } from 'react';
import TailSelect from '../ui/TailSelect'
import SubwayBox from './SubwayBox';
import sarea from '../db/sarea.json';

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

  useEffect(() => {
    if (!data)
      return;
    const tags = data.map((item, idx) =>
      <SubwayBox key={item + item.controlnumber} item={item} idx={idx}/>
    )
    setTag(tags);
  }, [data]);

  return (
    <div className='w-9/10'>
      <div className="grid grid-cols-2 gap-4  my-10">
        <div className='flex font-bold text-2xl items-center justify-center'>측정소 선택</div>
        <TailSelect selectRef={areaRef} caption="측정소" keys={sarea.map(item => item['코드'])} values={sarea.map(item => item['측정소'])} onChange={getFetchData} />
      </div>
      {tag}
    </div>
  )
}
