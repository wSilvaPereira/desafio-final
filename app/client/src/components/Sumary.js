import React from 'react';
import css from './sumary.module.css';
import { formatNumber } from '../helpers/formatHelpers.js';

export default function Sumary({
  totalTransaction,
  totalIn,
  totalOut,
  totalBalance,
}) {
  return (
    <div className={`${css.flex} row`}>
      <div className="col s3">{`Lançamentos: ${totalTransaction}`}</div>
      <div
        className="col s3 "
        style={{ backgroundColor: 'lightgreen' }}
      >{`Receitas: ${formatNumber(totalIn)}`}</div>
      <div
        className="col s3"
        style={{ backgroundColor: 'lightcoral' }}
      >{`Despesas: ${formatNumber(totalOut)}`}</div>
      <div className="col s3">{`Saldo: ${formatNumber(totalBalance)}`}</div>
    </div>
  );
}
