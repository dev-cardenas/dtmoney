import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext
} from 'react';
import { api } from '../services/api';

interface Transactions {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionsInput = Omit<Transactions, 'id' | 'createdAt'>
// type TransactionsInput = Pick<Transactions, 'title' | 'amount' | 'type'| 'category'>

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transactions[];
  createTransactions: (transactions: TransactionsInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({
  children
}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])
  
  useEffect(() => {
    api.get('/transactions')
      .then(res => setTransactions(res.data.transactions))
  }, [])

  async function createTransactions(transactionInput: TransactionsInput) {
    console.log({ 
      ...transactionInput,
      createdAt: new Date()
    })
    const res = await api.post(
      '/transactions',
      { 
        ...transactionInput,
        createdAt: new Date()
      }
    )

    const { transactions: transaction } = res.data

    setTransactions([
      ...transactions,
      transaction
    ])
  }

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context;
}