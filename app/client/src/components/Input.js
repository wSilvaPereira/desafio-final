import React from 'react';
import css from './input.module.css';

export default function Input({ onChangeValue, value, onClickOpenModal }) {
  const inputChange = (event) => {
    onChangeValue(event.target.value);
  };

  const onNewTransactionClick = () => {
    onClickOpenModal('');
  };

  return (
    <div className="row">
      <div className={`${css.flex}`}>
        <a
          type="button"
          value="+ NOVO LANÇAMENTO"
          className="waves-effect waves-light btn-small"
          onClick={onNewTransactionClick}
        >
          {`NOVA TRANSAÇÃO`}
        </a>
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
