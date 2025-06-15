import { render, screen, fireEvent } from '@testing-library/react'
import Login from './Login'

describe('Login', () => {
    
  it('renderiza o campo de código', () => {
    render(<Login login={jest.fn()} />)
    expect(screen.getByLabelText(/código do usuário/i)).toBeInTheDocument()
  })

  it('mostra erro se o código for inválido', async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: 'Usuário inválido' }),
        ok: true,
      })
    ) as jest.Mock

    render(<Login login={jest.fn()} />)

    const input = screen.getByLabelText(/código do usuário/i)
    const button = screen.getByRole('button', { name: /confirmar/i })

    fireEvent.change(input, { target: { value: 'abc123' } })
    fireEvent.click(button)

    expect(await screen.findByText(/usuário inválido/i)).toBeInTheDocument()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
