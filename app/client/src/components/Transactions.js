import React, { useEffect, useState } from 'react';
import css from './transactions.module.css';
import { formatNumber } from '../helpers/formatHelpers.js';

// import M from 'materialize-css';

export default function Transactions({
  allTransactions,
  onDeleteTransaction,
  onClickOpenModal,
  totalTransaction,
}) {
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  // let auxTotalPages = Math.ceil(totalTransaction / 5);
  if (totalTransaction > 0) {
    // setTotal(totalTransaction);
    // console.log(totalPages);
  }
  // console.log(totalTransaction);
  const [activePage, setActivePage] = useState(1);
  const [arrPosition, setArrPosition] = useState([]);

  // useEffect(() => {
  //   const auxTotal = Math.ceil(total / 5);
  //   setTotalPages(auxTotal);
  //   console.log(auxTotal);
  // }, [total]);

  // useEffect(() => {
  //   // setActivePage(1);
  //   let auxArr = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     auxArr.push(i);
  //   }
  //   console.log(auxArr);
  //   setArrPosition(auxArr);
  // }, [totalPages]);

  // setTotalPages(arrPages.length);

  const onEditClick = (event) => {
    onClickOpenModal(event.target.id);
  };
  const onDeleteClick = (event) => {
    onDeleteTransaction(event.target.id);
  };

  const handleItemClick = (event) => {
    setActivePage(event.target.id);
    // console.log(event.target.id);
  };

  return (
    <div>
      {
        <ul className="pagination" id="pagination">
          <li className={activePage === 1 ? 'disabled' : 'waves - effect'}>
            <a href="#!">
              <i className="material-icons">chevron_left</i>
            </a>
          </li>
          {arrPosition.map((item, index) => {
            // console.log(item);
            return (
              <li
                key={index}
                id={item}
                className={item === activePage ? 'active' : 'waves-effect'}
                onClick={handleItemClick}
              >
                <a href="#!" id={item}>
                  {item}
                </a>
              </li>
            );
          })}

          <li
            className={
              activePage === totalPages ? 'disabled' : 'waves - effect'
            }
          >
            <a href="#!">
              <i className="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
      }
      {allTransactions
        .sort((a, b) => {
          return b.type.localeCompare(a.type) || a.day - b.day;
        })
        .map((transaction, index) => {
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
