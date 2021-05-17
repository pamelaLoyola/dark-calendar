// DARK MODE TOGGLE
document.querySelector(".dark-mode-switch").onclick = () => {
	document.querySelector("body").classList.toggle("dark");
	document.querySelector("body").classList.toggle("light");
};

// VERIFY LEAP (BICIESTO) YEAR
isLypeYear = (year) => {
	return (
		(year % 4 === 0 && year % 100 !== 0) ||
		(year % 100 === 0 && year % 400 === 0)
	);
};

getFebDays = (year) => {
	return isLypeYear(year) ? 29 : 28;
};

// define months name list
const month_names = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

let calendar = document.querySelector(".calendar");

let month_picker = document.querySelector("#month-picker");

month_picker.onclick = () => {
	month_list.classList.add("show");
};

// GENERATE CALENDAR
generateCalendar = (month, year) => {
	// get the main elements in the html: days and year.
	let calendar_days = document.querySelector(".calendar-days");
	let calendar_header_year = document.querySelector("#year");

	// define days of month list
	let days_of_month = [
		31,
		getFebDays(year),
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31,
	];

	let current_day = new Date();

	month_picker.innerHTML = month_names[month];
	calendar_header_year.innerHTML = year;
	calendar_days.innerHTML = "";

	let first_day = new Date(year, month, 1);

	for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
		let day = document.createElement("div");
		if (i >= first_day.getDay()) {
			// day.classList.add("calendar-days-over");
			day.innerHTML = i - first_day.getDay() + 1;
			day.innerHTML += `<span></span>
							<span></span>
							<span></span>
							<span></span>`;
			if (
				i - first_day.getDay() + 1 === current_day.getDate() &&
				year === current_day.getFullYear() &&
				month === current_day.getMonth()
			) {
				day.classList.add("curr-date");
			}
		}

		calendar_days.appendChild(day);
	}
};

// GENERATE MONTH OPTIONS
let month_list = calendar.querySelector(".month-list");

month_names.forEach((e, index) => {
	let month = document.createElement("div");
	month.innerHTML = `<div>${e}</div>`;
	month.onclick = () => {
		month_list.classList.remove("show");
		current_month.value = index;
		generateCalendar(current_month.value, current_year.value);
	};
	month_list.appendChild(month);
});

// PREVIOUS YEAR FUNCTION
document.querySelector("#prev-year").onclick = () => {
	--current_year.value;
	generateCalendar(current_month.value, current_year.value);
};

// NEXT YEAR FUNCTION
document.querySelector("#next-year").onclick = () => {
	++current_year.value;
	generateCalendar(current_month.value, current_year.value);
};

let current_day = new Date();

let current_month = { value: current_day.getMonth() };
let current_year = { value: current_day.getFullYear() };

generateCalendar(current_month.value, current_year.value);
