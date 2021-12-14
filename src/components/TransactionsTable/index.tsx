
import { Container } from './styles';

export function TransactionsTable () {
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
          <tr>
            <td>test</td>
            <td className='deposit'>test</td>
            <td>test</td>
            <td>test</td>
          </tr>
          <tr>
            <td>test</td>
            <td className='withdraw'> - test</td>
            <td>test</td>
            <td>test</td>
          </tr>
        </tbody>
     </table>
    </Container>
  )
}