const yearSelects = document.querySelectorAll(".years");
const daySelects = document.querySelectorAll(".days");
const monthSelects = document.querySelectorAll(".months");
const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const pickYear = () => {
  let currentTime = new Date();
  let thisYear = currentTime.getFullYear();

  let startYear = 1960;
  let years = [];

  for (let x = thisYear; x >= startYear; x--) {
    years.push(x);
  }

  yearSelects.forEach(select => {
    years.forEach(year => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      select.appendChild(option);
    });
  });
}

pickYear();

const pickDay = () => {
  daySelects.forEach(select => {
    for(let day = 1; day <= 31; day++) {
      const option = document.createElement("option");
      option.value = day;
      option.textContent = day;
      select.appendChild(option);
    }
  });
}

pickDay();

const pickMonth = () => {
  monthSelects.forEach(select => {
    MONTHS.forEach(month => {
      const option = document.createElement("option");
      option.value = month;
      option.textContent = month;
      select.appendChild(option);
    });
  });
}

pickMonth();
