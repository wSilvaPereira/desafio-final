import React from 'react';
import css from './input.module.css';

export default function Input({ onChangeValue, value }) {
  const inputChange = (event) => {
    onChangeValue(event.target.value);
  };
  return (
    <div className="row">
      <div className={`${css.flex}`}>
        <input
          type="button"
          value="+ NOVO LANÇAMENTO"
          className="waves-effect waves-light btn-small"
        />
        <div className="input-field col s10">
          <input
            type="text"
            id="searchInput"
            className="validate"
            placeholder="filtro"
            onChange={inputChange}
            value={value}
          />
        </div>
      </div>
    </div>
  );
}
