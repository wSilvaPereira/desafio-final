import React from 'react';
import css from './navegation.module.css';

export default function Navegation({
  onChangeSelected,
  currentPeriod,
  periods,
}) {
  const extratYearMonth = (formatedYearMonth) => {
    const year = formatedYearMonth.slice(0, 4);
    const month = formatedYearMonth.slice(5, 7);
    return { year, month };
  };

  const selectHandleChange = (event) => {
    onChangeSelected(event.target.value);
  };

  const handleButtonClick = (event) => {
    const type = event.target.value;
    const yearMonth = extratYearMonth(currentPeriod);
    let year = parseInt(yearMonth.year, 10);
    let month = parseInt(yearMonth.month, 10);
    if (type === '<') {
      if (month === 1) {
        year--;
        month = 12;
      } else {
        month--;
      }
    } else {
      if (month === 12) {
        year++;
        month = 1;
      } else {
        month++;
      }
    }
    onChangeSelected(`${year.toString()}-${month.toString().padStart('2', 0)}`);
  };
  return (
    <div className={`${css.flex}`}>
      <input
        type="button"
        value="<"
        className="waves-effect waves-light btn-small "
        onClick={handleButtonClick}
      />
      <select
        className="browser-default"
        id="yearMonthSelect"
        style={{ width: '150px', textAlignLast: 'center' }}
        onChange={selectHandleChange}
        value={currentPeriod}
      >
        {periods.map((item, index) => {
          const yearMonth = extratYearMonth(item);
          const year = yearMonth.year;
          const month = yearMonth.month;
          return (
            <option key={index} value={`${item}`}>
              {`${month}-${year}`}
            </option>
          );
        })}
      </select>
      <input
        type="button"
        value=">"
        className="waves-effect waves-light btn-small"
        onClick={handleButtonClick}
      />
    </div>
  );
}
