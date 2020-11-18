import React, { useState } from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal';
import css from './modaltransaction.module.css';

// import M from 'materialize-css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export default function ModalTransaction({
  isModalOpen,
  onClose,
  isIncluding,
  transactionData,
  saveTransaction,
}) {
  const {
    _id,
    type,
    description,
    category,
    value,
    yearMonthDay,
  } = transactionData;
  // console.log('teste', type);
  const [transactionType, setTransactionType] = useState(type);
  const [transactionDesc, setTransactionDesc] = useState(description);
  const [transactionCategory, setTransactionCategory] = useState(category);
  const [transactionValue, setTransactionValue] = useState(value);
  const [transactionDate, setTransactionDate] = useState(yearMonthDay);
  const [canSave, setCanSave] = useState(false);

  // useEffect(() => {
  //   // M.AutoInit();
  //   console.log(transactionType);
  // }, [transactionType]);

  useEffect(() => {
    setCanSave(
      transactionType !== '' &&
        transactionDesc !== '' &&
        transactionCategory !== '' &&
        transactionValue > 0
    );
  }, [
    transactionType,
    transactionDesc,
    transactionCategory,
    transactionValue,
    transactionDate,
  ]);

  const handleModalClose = () => {
    onClose(null);
  };

  const handleSaveClick = () => {
    const info = {
      type: transactionType,
      description: transactionDesc,
      category: transactionCategory,
      value: transactionValue,
      yearMonthDay: transactionDate,
    };
    saveTransaction(_id, info);
  };

  const handleRadio = (event) => {
    setTransactionType(event.target.value);
  };

  const handleChangeValues = () => {
    const compoDesc = document.getElementById('description');
    const compoCategory = document.getElementById('category');
    const compoValue = document.getElementById('value');
    const compoData = document.getElementById('date');

    setTransactionDesc(compoDesc.value);
    setTransactionCategory(compoCategory.value);
    setTransactionValue(compoValue.value);
    setTransactionDate(compoData.value);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} style={customStyles}>
        <div className={css.flexColumn}>
          <div className={`${css.align}`}>
            <div className={`${css.flexRow} ${css.align}`}>
              <h5 style={{ marginRight: '10px' }}>
                {isIncluding
                  ? 'Inclusão de lançamento'
                  : 'Edição de lançamento'}
              </h5>
              <div
                className="waves-effect waves-light btn red darken-1"
                onClick={handleModalClose}
              >
                X
              </div>
            </div>
          </div>

          <div className={`${css.flexRow} ${css.align}`}>
            <p>
              <label htmlFor="inputIn">
                <input
                  type="radio"
                  name="input1"
                  id="inputIn"
                  value="+"
                  onChange={handleRadio}
                  checked={transactionType === '+'}
                  disabled={!isIncluding}
                />
                <span>Receita</span>
              </label>
            </p>
            <p>
              <label htmlFor="inputOut">
                <input
                  type="radio"
                  name="input2"
                  id="inputOut"
                  value="-"
                  onChange={handleRadio}
                  checked={transactionType === '-'}
                  disabled={!isIncluding}
                />
                <span>Despesa</span>
              </label>
            </p>
          </div>

          <div>
            <label htmlFor="description">Descrição</label>
            <input
              id="description"
              type="text"
              value={`${transactionDesc}`}
              onChange={handleChangeValues}
            />
          </div>
          <div>
            <label htmlFor="category">Categoria</label>
            <input
              id="category"
              type="text"
              value={transactionCategory}
              onChange={handleChangeValues}
            />
          </div>
          <div className={css.flexRow}>
            <div>
              <label htmlFor="value">Valor</label>
              <input
                id="value"
                type="number"
                min="00"
                value={transactionValue}
                onChange={handleChangeValues}
              />
            </div>
            <div>
              <label htmlFor="value">Data</label>
              <input
                type="date"
                name="date"
                id="date"
                value={transactionDate}
                onChange={handleChangeValues}
              />
            </div>
          </div>
          <span
            className="waves-effect waves-light btn"
            disabled={!canSave}
            onClick={handleSaveClick}
          >
            Salvar
          </span>
        </div>
      </Modal>
    </div>
  );
}
