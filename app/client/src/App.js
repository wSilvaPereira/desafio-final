import React, { memo, useEffect, useState } from 'react';
import Input from './components/Input';
import ModalTest from './components/ModalTest';
import Navegation from './components/Navegation';
import Sumary from './components/Sumary';
// import ModalTest from './components/ModalTest';
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

  const EditTransaction = (id) => {
    console.log(id);
  };

  const inputDescChange = (description) => {
    setCurrentFilter(description);
    const filteredTransaction = allTransactions.filter((item) => {
      return item.description.toLowerCase().includes(description.toLowerCase());
    });
    setFilteredTransactions(filteredTransaction);
    console.log(description);
  };

  return (
    <div className="container">
      <h3 style={{ textAlign: 'center' }}>
        Desafio Final do Bootcamp Full Stack
      </h3>
      <h4 style={{ textAlign: 'center' }}>Controle Financeiro Pessoal</h4>
      {/* <ModalTest /> */}
      {/* <InputModal /> */}
      <ModalTest />
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
      <Input onChangeValue={inputDescChange} value={currentFilter} />
      <Transactions
        allTransactions={filteredTransactions}
        onDeleteTransaction={deleteTransaction}
        onEditTransaction={EditTransaction}
      />
    </div>
  );
}
