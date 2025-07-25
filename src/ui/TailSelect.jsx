export default function TailCard({ selectRef, caption, keys, values, onChange=() => {} }) {
  return (
    <select ref={selectRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue="" onChange={onChange}>
      <option value="" disabled>{caption} 선택</option>
      {keys.map((item, idx) => <option key={item + values[idx]} value={item}>{values[idx]}</option>)}
    </select>
  )
}