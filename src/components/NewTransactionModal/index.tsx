import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { TransactionsContext } from '../../context/TransactionsContext';
import { api } from '../../services/api';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import {
  Container,
  TransactionsTypeContainer, 
  RadioBox
} from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose
}: NewTransactionModalProps) {
  const { createTransactions } = useContext(TransactionsContext)

  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')


  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();
    await createTransactions({
      type,
      title,
      amount,
      category
    })

    setType('')
    setTitle('')
    setAmount(0)
    setCategory('')
    onRequestClose()

  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Cerrar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Crear Transacción</h2>

        <input
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />

        <TransactionsTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"

          >
            <img src={outcomeImg} alt="Salida" />
            <span>Salida</span>
          </RadioBox>
        

        </TransactionsTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        <button type="submit">
          Crear
        </button>

      </Container>
    </Modal>
  )
}
