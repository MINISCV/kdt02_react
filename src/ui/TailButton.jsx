export default function TailButton({ caption, color, onClick }) {
	const colors = {
		"red": "bg-red-600",
		"amber": "bg-amber-600",
		"lime": "bg-lime-600",
		"sky": "bg-sky-600",
		"blue": "bg-blue-600",
		"violet": "bg-violet-600",
		"orange": "bg-orange-600",
	}

	const bgHover = {
		"red": "hover:bg-red-400",
		"amber": "hover:bg-amber-400",
		"lime": "hover:bg-lime-400",
		"sky": "hover:bg-sky-400",
		"blue": "hover:bg-blue-400",
		"violet": "hover:bg-violet-400",
		"orange": "hover:bg-orange-400",
	}
	return (
		<button className={`mx-2 p-4 rounded-xl text-white hover:cursor-pointer hover:font-bold ${colors[color]} ${bgHover[color]}`} onClick={onClick}>
			{caption}
		</button>
	)
}