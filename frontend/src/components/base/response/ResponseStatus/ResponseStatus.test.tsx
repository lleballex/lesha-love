import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import '@testing-library/jest-dom'

import { ResponseStatus as IResponseStatus } from '@/types/entities/response'

import ResponseStatus from './ResponseStatus'

describe('ResponseStatus', () => {
  it('renders pending status correctly', () => {
    render(<ResponseStatus status={IResponseStatus.Pending} />)

    expect(screen.getByText('На рассмотрении')).toBeInTheDocument()

    const dot = screen.getByText('На рассмотрении').firstChild as HTMLElement
    expect(dot.className).toContain('bg-yellow-400')
  })

  it('renders approved status correctly', () => {
    render(<ResponseStatus status={IResponseStatus.Approved} />)

    expect(screen.getByText('Принят')).toBeInTheDocument()

    const dot = screen.getByText('Принят').firstChild as HTMLElement
    expect(dot.className).toContain('bg-green-400')
  })

  it('renders rejected status correctly', () => {
    render(<ResponseStatus status={IResponseStatus.Rejected} />)

    expect(screen.getByText('Отклонен')).toBeInTheDocument()

    const dot = screen.getByText('Отклонен').firstChild as HTMLElement
    expect(dot.className).toContain('bg-red-400')
  })
})
