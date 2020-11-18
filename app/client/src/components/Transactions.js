import React from 'react';
import css from './transactions.module.css';
import { formatNumber } from '../helpers/formatHelpers.js';

// import M from 'materialize-css';

export default function Transactions({
  allTransactions,
  onDeleteTransaction,
  onClickOpenModal,
  totalPages,
  currentPage,
  onClickItemPagination,
}) {
  // console.log(totalPages, currentPage);
  let itensPagination = [];
  for (let i = 1; i <= totalPages; i++) {
    itensPagination.push(i);
  }

  const onEditClick = (event) => {
    onClickOpenModal(event.target.id);
  };
  const onDeleteClick = (event) => {
    onDeleteTransaction(event.target.id);
  };

  const handleItemClick = (event) => {
    onClickItemPagination(event.target.id);
  };

  const handleMoveCurrentPage = (event) => {
    let newPosition = currentPage;
    if (event.target.id === 'foward') {
      newPosition++;
    } else {
      newPosition--;
    }
    onClickItemPagination(newPosition);
  };

  return (
    <div>
      {
        <ul
          className={`${css.flexPagination} pagination`}
          // style={{ padding: '10px' }}
          id="pagination"
        >
          <li
            className={currentPage === 1 ? 'disabled' : 'waves - effect'}
            onClick={handleMoveCurrentPage}
            id="backward"
          >
            <a href="#!">
              <i id="backward" className="material-icons">
                chevron_left
              </i>
            </a>
          </li>
          {itensPagination.map((item, index) => {
            // console.log(item);
            return (
              <li
                key={index}
                id={item}
                className={item === currentPage ? 'active' : 'waves-effect'}
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
              currentPage === totalPages ? 'disabled' : 'waves - effect'
            }
            onClick={handleMoveCurrentPage}
            id="foward"
          >
            <a href="#!">
              <i id="foward" className="material-icons">
                chevron_right
              </i>
            </a>
          </li>
        </ul>
      }
      {allTransactions
        // .sort((a, b) => {
        //   return b.type.localeCompare(a.type) || a.day - b.day;
        // })
        .map((transaction, index) => {
          const { _id, day, description, category, value, type } = transaction;
          const style = type === '-' ? css.out : css.in;
          const formatedDay = day.toString().padStart(2, '0');
          return (
            <div
              key={_id}
              id={_id}
              className={`${css.flexNivel1} ${style} row z-depth-3`}
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
