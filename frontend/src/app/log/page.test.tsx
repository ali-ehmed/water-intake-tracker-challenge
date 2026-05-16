import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LogPage from './page'

// Mock fetch
global.fetch = jest.fn()

describe('LogPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the log form', () => {
    render(<LogPage />)
    
    expect(screen.getByText('Log Water Intake 💧')).toBeInTheDocument()
    expect(screen.getByLabelText('User ID')).toBeInTheDocument()
    expect(screen.getByLabelText('Date')).toBeInTheDocument()
    expect(screen.getByLabelText('Water Intake (ml)')).toBeInTheDocument()
    expect(screen.getByText('Log Water Intake')).toBeInTheDocument()
  })

  it('submits form with correct data', async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Water intake logged successfully' })
    } as Response)

    render(<LogPage />)
    
    const intakeInput = screen.getByLabelText('Water Intake (ml)')
    fireEvent.change(intakeInput, { target: { value: '1500' } })
    
    const submitButton = screen.getByText('Log Water Intake')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/water/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user123',
          date: expect.any(String),
          intakeMl: 1500
        }),
      })
    })
  })

  it('shows success message after successful submission', async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Water intake logged successfully' })
    } as Response)

    render(<LogPage />)
    
    const intakeInput = screen.getByLabelText('Water Intake (ml)')
    fireEvent.change(intakeInput, { target: { value: '1500' } })
    
    const submitButton = screen.getByText('Log Water Intake')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Water intake logged successfully! 💧')).toBeInTheDocument()
    })
  })

  it('shows error message on failed submission', async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Failed to log water intake' })
    } as Response)

    render(<LogPage />)
    
    const intakeInput = screen.getByLabelText('Water Intake (ml)')
    fireEvent.change(intakeInput, { target: { value: '1500' } })
    
    const submitButton = screen.getByText('Log Water Intake')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to log water intake')).toBeInTheDocument()
    })
  })
}) 