import React from 'react'
import { create } from 'react-test-renderer'
import { ContextProvider } from './Context'

describe('Testing ContextProvider', () => {
  // TODO: verify that blockchain instance is in state

  test('Product data: initializing correctly', () => {
    const component = create(<ContextProvider />)
    const instance = component.getInstance()
    const {
      productionUnit,
      compound,
      dose,
      hashSalt,
      productionTime,
    } = instance.state.productData

    expect(productionUnit).toBe('CPHarma')
    expect(compound).toBe('rosuvastatin')
    expect(dose).toBe('5 mg')
    expect(hashSalt).toMatch(/^[A-F0-9]{5}\s[A-F0-9]{5}$/)
    expect(productionTime).toMatch(/^20\d\d-[0-2]\d-[0-3]\d\s[0-2]\d:[0-6]\d$/)
  })

  test('Dose: Getting and setting', () => {
    const component = create(<ContextProvider />)
    const instance = component.getInstance()

    // Verify that getting the dose returns a correct number (and not a string)
    expect(instance.getDose()).toBe(5)

    // Verify that changing the dose updates and can be retrieved correctly
    instance.setDose(2)
    expect(instance.state.productData.dose).toBe('2 mg')
    expect(instance.getDose()).toBe(2)
  })
})
