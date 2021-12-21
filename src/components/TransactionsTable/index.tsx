import { useContext } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';
import { Container } from './styles';

export function TransactionsTable () {
  const transactions = useContext(TransactionsContext)

  return (
    <Container>
     <table>
       <thead>
         <tr>
           <th>Titulo</th>
           <th>Valor</th>
           <th>Categoria</th>
           <th>Data</th>
         </tr>
       </thead>
       <tbody>
          {
            transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat('es-PY', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat('es-PY').format(
                    new Date(transaction.createdAt)
                  )}
                  </td>
              </tr>
            ))
          }
        </tbody>
     </table>
    </Container>
  )
}