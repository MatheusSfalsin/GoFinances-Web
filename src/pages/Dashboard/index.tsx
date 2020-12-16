import React, { useState, useEffect, HTMLAttributes, TableHTMLAttributes } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatValueDate from '../../utils/formatValueDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

interface ReponseTransction {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: object;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const reponse = await api.get('/transactions');
      const { data } = reponse;

      const incomeValue = String(formatValue(data.balance.income));
      const outcomeValue = String(formatValue(data.balance.outcome));
      const totalValue = String(formatValue(data.balance.total));

      const dataTransactions = data.transactions;

      const mappedTransactions = dataTransactions.map(
        (transac: ReponseTransction) => {
          const formattedDate = formatValueDate(transac.created_at);
          const value = String(formatValue(transac.value));
          const formattedValue =
            transac.type === 'outcome' ? `- ${value}` : value;
          return { ...transac, formattedDate, formattedValue };
        },
      );

      setTransactions(mappedTransactions);
      setBalance({
        income: incomeValue,
        outcome: outcomeValue,
        total: totalValue,
      });
    }

    loadTransactions();
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const renderItemTransaction = ({
    id,
    title,
    value,
    formattedValue,
    formattedDate,
    type,
    category,
  }: Transaction) => (
    <tr key={id}>
      <td className="title">{title}</td>
      <td className={type}>{formattedValue || value}</td>
      <td>{category.title}</td>
      <td>{formattedDate}</td>
    </tr>
  );

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction =>
                renderItemTransaction(transaction),
              )}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
