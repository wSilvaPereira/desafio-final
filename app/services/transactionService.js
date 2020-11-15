const mongoose = require('mongoose');
const TransactionModel = require('../models/TransactionModel');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const transactionModel = require('../models/TransactionModel');

const create = async (req, res) => {
  try {
    const day = req.body.day.toString().padStart(2, '0');
    const month = req.body.month.toString().padStart(2, '0');
    const year = req.body.year.toString().padStart(4, '0');
    const yearMonth = `${year}-${month}`;
    const yearMonthDay = `${year}-${month}-${day}`;

    const transaction = { ...req.body, yearMonth, yearMonthDay };
    const newTransaction = new transactionModel(transaction);
    await newTransaction.save();
    res.send(newTransaction);
  } catch (error) {
    res.status(404).send('Erro ao incluir a transação');
  }
};
const find = async (req, res) => {
  try {
    // console.log(req.query.period);
    const period = req.query.period;
    if (!!period) {
      const yearMonth = { yearMonth: period };
      // console.log(yearMonth);
      transactions = await transactionModel.find(yearMonth);
      res.send(transactions);
    } else {
      res.status(400).send({
        error:
          'É necessário informar o parâmetro "period" cujo formato deve estar no formato yyyy-mm',
      });
    }
  } catch (error) {
    res.status(404).send('Erro ao buscar as transações');
  }
};

const findYearMonth = async (_, res) => {
  try {
    const yearMonths = await transactionModel.distinct('yearMonth');
    res.send(yearMonths);
  } catch (error) {
    res.status(404).send('Erro ao buscar as transações');
  }
};

const findByPeriod = async (req, res) => {
  try {
    console.log(req.params.period);
    res.send(req.params.period);
  } catch (error) {
    res.status(404).send('Erro ao buscar as transações');
  }
};

const findDescription = async (req, res) => {
  try {
    const description = req.params.desc;
    var condition = description
      ? { description: { $regex: new RegExp(description), $options: 'i' } }
      : {};

    const transactions = await transactionModel.find(condition);

    res.send(transactions);
  } catch (error) {
    res.status(404).send('Erro ao buscar as transações');
  }
};

// const findOne = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const transaction = await transactionModel.findById(id);
//     if (transaction !== null) {
//       res.send(transaction);
//     } else {
//       res.send('Transação não localizada.');
//     }
//   } catch (error) {
//     res.status(404).send('Erro ao buscar a transação');
//   }
// };
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await transactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    if (transaction !== null) {
      res.send(transaction);
    } else {
      res.status(404).send('A transação não foi atualizada');
    }
  } catch (error) {
    res.status(404).send('Erro ao atualizar a transação');
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const transaction = await transactionModel.findByIdAndDelete(id);
    res.send(transaction);
  } catch (error) {
    res.status(404).send('Erro ao excluir a transação');
  }
};
const removeAll = async (req, res) => {
  try {
    await transactionModel.deleteMany();
    res.send('Todas as transações foram excluídas');
  } catch (error) {
    res.status(404).send('Erro ao excluir as transações');
  }
};

module.exports = {
  create,
  find,
  findYearMonth,
  findByPeriod,
  findDescription,
  update,
  remove,
  removeAll,
};
