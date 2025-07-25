import scode from '../db/scode.json';

export default function SubwayBox({ item, idx }) {
    const sensorKeys = ['pm10', 'co2', 'co', 'no2', 'no', 'nox', 'o3', 'pm25', 'fad'];
    const formatDateTime = (number) => {
        const year = number.substring(0, 4);
        const month = number.substring(4, 6);
        const day = number.substring(6, 8);
        const hour = number.substring(8, 10);

        return `${year}.${month}.${day} ${hour}시`;
    }
    const bg = ['bg-emerald-600', 'bg-amber-600']
    const border = ['border-emerald-600', 'border-amber-600']
    return (
        <div>
            {formatDateTime(item.controlnumber)}
            <table className='w-full mb-10'>
                <thead className={`${bg[idx%2]} text-center text-white font-bold`}>
                    <tr className='border border-white h-20'>
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
                    <tr key={item + item.controlnumber} className={`border ${border[idx%2]} font-bold h-10`}>
                        {sensorKeys.map(key => (
                            <td key={key} className='border border-emerald-600'>
                                {item[key]}{item[key] !== '-' ? scode[key]['unit'] : ''}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}