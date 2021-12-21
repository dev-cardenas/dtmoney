import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

import { Container } from './styles';

export function Summary () {
  const { transactions } = useTransactions()

  const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposit'){
      acc.deposits +=  transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraws +=  transaction.amount;
      acc.total -= transaction.amount;
    }
    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  })


  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {
            new Intl.NumberFormat('es-PY', {
              style: 'currency',
              currency: 'USD'
            }).format(summary.deposits)
          }
        </strong>
      </div>

      <div>
        <header>
          <p>Salidas</p>
          <img src={outcomeImg} alt="Salidas" />
        </header>
        <strong>
          - {
            new Intl.NumberFormat('es-PY', {
              style: 'currency',
              currency: 'USD'
            }).format(summary.withdraws)
          }
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {
            new Intl.NumberFormat('es-PY', {
              style: 'currency',
              currency: 'USD'
            }).format(summary.total)
          }
        </strong>
      </div>
    </Container>
  )
}