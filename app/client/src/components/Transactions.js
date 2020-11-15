import React from 'react';
import css from './transactions.module.css';
import { formatNumber } from '../helpers/formatHelpers.js';

export default function Transactions({
  allTransactions,
  onDeleteTransaction,
  onEditTransaction,
}) {
  const onEditClick = (event) => {
    console.log(event.target.id);
  };
  const onDeleteClick = (event) => {
    onDeleteTransaction(event.target.id);
    // console.log(event.target.id);
  };

  return (
    <div>
      {allTransactions.map((transaction, index) => {
        const { _id, day, description, category, value, type } = transaction;
        const style = type === '-' ? css.out : css.in;
        const formatedDay = day.toString().padStart(2, '0');
        return (
          <div
            key={_id}
            id={_id}
            className={`${css.flexNivel1} ${style} row z-depth-1`}
          >
            <div id="day" className="col s1">
              {formatedDay}
            </div>
            <div id="info" className={`${css.flexInfo} col s7`}>
              <div id="category">{category}</div>
              <div id="description">{description}</div>
            </div>
            <div id="value" className="col s3">
              {formatNumber(value)}
            </div>
            <div className="col s1">
              <i
                className={`${css.buttons} material-icons tiny`}
                id={_id}
                onClick={onEditClick}
              >
                edit
              </i>
              <i
                className={`${css.buttons} material-icons tiny`}
                id={_id}
                onClick={onDeleteClick}
              >
                delete
              </i>
            </div>
          </div>
        );
      })}
    </div>
  );
}
