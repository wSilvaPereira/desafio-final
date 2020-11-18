import React, { memo, useEffect, useState } from 'react';
import Input from './components/Input';
import ModalTransaction from './components/ModalTransaction';
import Navegation from './components/Navegation';
import Sumary from './components/Sumary';
import Transactions from './components/Transactions';
import transactionService from './services/TransactionService.js';

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [totalIn, setTotalIn] = useState(0);
  const [totalOut, setTotalOut] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [periods, setPeriods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState('');
  const [currentFilter, setCurrentFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIncluding, setIsIncluding] = useState(false);
  const [transactionData, setTransactionData] = useState({});

  useEffect(() => {
    let yearMonths = [];
    transactionService.getYearMonth().then((response) => {
      yearMonths = [...response.data];
      setPeriods(yearMonths);

      if (currentPeriod === '') {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;

        setCurrentPeriod(`${year}-${month}`);
      }
    });
  }, []);

  useEffect(() => {
    if (currentPeriod !== '') {
      transactionService.getFromPeriod(currentPeriod).then((response) => {
        setAllTransactions(response.data);
      });
    }
    setCurrentFilter('');
  }, [currentPeriod]);

  useEffect(() => {
    setFilteredTransactions(allTransactions);
  }, [allTransactions]);

  useEffect(() => {
    let currTotalIn = 0;
    let currTotalOut = 0;
    setTotalTransaction(filteredTransactions.length);
    if (filteredTransactions.length > 0) {
      filteredTransactions.forEach((transaction) => {
        if (transaction.type === '-') {
          currTotalOut += transaction.value;
        } else {
          currTotalIn += transaction.value;
        }
      });
    }
    setTotalIn(currTotalIn);
    setTotalOut(currTotalOut);
    setTotalBalance(currTotalIn - currTotalOut);
  }, [filteredTransactions]);

  const handleChangeSelected = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  const deleteTransaction = (id) => {
    transactionService.remove(id).then((response) => {
      setCurrentPeriod('');
      setCurrentPeriod(currentPeriod);
    });
  };

  const saveTransaction = (_id, savedTransaction) => {
    if (isIncluding) {
      transactionService.create(savedTransaction).then((response) => {
        setCurrentPeriod('');
        setCurrentPeriod(currentPeriod);
      });
    } else {
      transactionService.update(_id, savedTransaction).then((response) => {
        setCurrentPeriod('');
        setCurrentPeriod(currentPeriod);
      });
    }

    setIsModalOpen(false);
  };

  const inputDescChange = (description) => {
    setCurrentFilter(description);
    const filteredTransaction = allTransactions.filter((item) => {
      return item.description.toLowerCase().includes(description.toLowerCase());
    });
    setFilteredTransactions(filteredTransaction);
    console.log(description);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (id) => {
    setIsIncluding(id === '');
    let selectedTransaction = filteredTransactions.filter((item) => {
      return item._id === id;
    });
    if (selectedTransaction.length === 0) {
      const auxdate = new Date();
      selectedTransaction = [
        {
          _id: '',
          description: '',
          category: '',
          type: '+',
          value: 0,
          yearMonthDay:
            auxdate.getFullYear() +
            '-' +
            (auxdate.getMonth() + 1) +
            '-' +
            auxdate.getDate().toString().padStart(2, '0'),
        },
      ];
    }
    setTransactionData(selectedTransaction[0]);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <h3 style={{ textAlign: 'center' }}>
        Desafio Final do Bootcamp Full Stack
      </h3>
      <h4 style={{ textAlign: 'center' }}>Controle Financeiro Pessoal</h4>
      {!isModalOpen && (
        <div>
          <Navegation
            onChangeSelected={handleChangeSelected}
            currentPeriod={currentPeriod}
            periods={periods}
          />
          <Sumary
            totalTransaction={totalTransaction}
            totalIn={totalIn}
            totalOut={totalOut}
            totalBalance={totalBalance}
          />
          <Input
            onChangeValue={inputDescChange}
            value={currentFilter}
            onClickOpenModal={handleModalOpen}
          />
          <Transactions
            allTransactions={filteredTransactions}
            onDeleteTransaction={deleteTransaction}
            onClickOpenModal={handleModalOpen}
            totalTransaction={totalTransaction}
          />
        </div>
      )}
      {isModalOpen && (
        <ModalTransaction
          isModalOpen={isModalOpen}
          onClose={onCloseModal}
          isIncluding={isIncluding}
          saveTransaction={saveTransaction}
          transactionData={transactionData}
        />
      )}
    </div>
  );
}
