import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Dashboard from './Dashboard'
import type { User } from '../types/User'

const mockUser: User = {
  code: '123',
  id: '1',
  timestamps: [
    { 
        id: '1', 
        createdAt: new Date().toISOString(),
        type: 'IN',
    },
  ],
}

describe('Dashboard', () => {

    beforeAll(() => {
        window.fetch = jest.fn(() =>
            Promise.resolve({
            ok: true,
            json: () => Promise.resolve([])
            })
        ) as jest.Mock
    })

  it('renderiza o código do usuário e o título', async () => {
    render(<Dashboard user={mockUser} />)
    await waitFor(() => {
        expect(screen.getByText(/relógio de ponto/i)).toBeInTheDocument()
        expect(screen.getByText(`#${mockUser.code}`)).toBeInTheDocument()
    })
  })

  it('exibe "Hora de saída" se o último registro for "IN"', async () => {
    render(<Dashboard user={mockUser} />)
    await waitFor(() => {
        expect(screen.getByRole('button', { name: /hora de saída/i })).toBeInTheDocument()
    })
  })

  it('simula um click no botao', async () => {
    render(<Dashboard user={mockUser} />)
    await waitFor(() => {
        const button = screen.getByRole('button', { name: /hora de saída/i })
        fireEvent.click(button)
    })
  })

})
