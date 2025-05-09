import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import '@testing-library/jest-dom'

import { VacancyStatus as IVacancyStatus } from '@/types/entities/vacancy'

import VacancyStatus from './VacancyStatus'

describe('VacancyStatus', () => {
  it('renders active status correctly', () => {
    render(<VacancyStatus status={IVacancyStatus.Active} />)

    expect(screen.getByText('Активна')).toBeInTheDocument()

    const dot = screen.getByText('Активна').firstChild as HTMLElement
    expect(dot.className).toContain('bg-green-400')
  })

  it('renders closed status correctly', () => {
    render(<VacancyStatus status={IVacancyStatus.Closed} />)

    expect(screen.getByText('В архиве')).toBeInTheDocument()

    const dot = screen.getByText('В архиве').firstChild as HTMLElement
    expect(dot.className).toContain('bg-gray-400')
  })
})
