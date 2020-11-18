import React, { useEffect, useState } from 'react';
import Input from './components/Input';
import ModalTransaction from './components/ModalTransaction';
import Navegation from './components/Navegation';
import Sumary from './components/Sumary';
import Transactions from './components/Transactions';
import transactionService from './services/TransactionService.js';

const totalItemPerPage = 7;

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

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginationTransaction, setPaginationTransaction] = useState([]);

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
  }, [allTransactions, currentPeriod]);

  useEffect(() => {
    if (currentPeriod !== '') {
      transactionService.getFromPeriod(currentPeriod).then((response) => {
        setAllTransactions(
          response.data.sort((a, b) => {
            return b.type.localeCompare(a.type) || a.day - b.day;
          })
        );
        setCurrentPage(0);
        setCurrentPage(1);
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
      setTotalPages(Math.ceil(filteredTransactions.length / totalItemPerPage));
      setCurrentPage(1);
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
        // setCurrentPage(currentPage);
        // const auxTotal = totalPages;
        // setTotalPages(0);
        // setTotalPages(auxTotal);
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
    // console.log(description);
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

  useEffect(() => {
    const lastItem = currentPage * totalItemPerPage;
    const firstItem = lastItem - (totalItemPerPage - 1);

    const auxVisibleTransaction = [];
    if (filteredTransactions.length > 0) {
      for (let i = firstItem - 1; i < lastItem; i++) {
        if (!!filteredTransactions[i]) {
          auxVisibleTransaction.push(filteredTransactions[i]);
        }
      }
    }
    setPaginationTransaction(auxVisibleTransaction);
  }, [currentPage, totalPages, filteredTransactions]);

  const handleItemPagination = (page) => {
    setCurrentPage(parseInt(page, 0));
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
          <Input
            onChangeValue={inputDescChange}
            value={currentFilter}
            onClickOpenModal={handleModalOpen}
          />
          <div className="z-depth-3" style={{ padding: '10px' }}>
            <Sumary
              totalTransaction={totalTransaction}
              totalIn={totalIn}
              totalOut={totalOut}
              totalBalance={totalBalance}
            />
            <Transactions
              // allTransactions={filteredTransactions}
              allTransactions={paginationTransaction}
              onDeleteTransaction={deleteTransaction}
              onClickOpenModal={handleModalOpen}
              totalPages={totalPages}
              currentPage={currentPage}
              onClickItemPagination={handleItemPagination}
            />
          </div>
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
