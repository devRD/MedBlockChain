import React from 'react'
import { create } from 'react-test-renderer'
import { ContextProvider } from './Context'

// Avoid repeating code by always initiating an instance
let instance = null
beforeEach(() => {
  const component = create(<ContextProvider />)
  instance = component.getInstance()
})

const [
  default_productionUnit,
  default_compound,
  default_dose,
  default_hashSalt,
  default_productionTime,
  default_manufacturedDrugs,
  default_prescriptionDose,
] = [
  'CPHarma',
  'rosuvastatin',
  '5 mg',
  /^[A-F0-9]{5}\s[A-F0-9]{5}$/,
  /^20\d\d-[0-2]\d-[0-3]\d\s[0-2]\d:[0-6]\d$/,
  [
    {
      compound: 'rosuvastatin',
      dose: '5 mg',
      hashSalt: 'A8DAD 9A13A',
      productionTime: '2018-08-01 09:00',
      productionUnit: 'CPHarma',
    },
    {
      compound: 'rosuvastatin',
      dose: '5 mg',
      hashSalt: 'ABC99 ABC99',
      productionTime: '2018-09-04 14:00',
      productionUnit: 'CPHarma',
    },
  ],
  [0, 100, 0],
]

describe('Testing ContextProvider', () => {
  // TODO: state: blockchain

  test('state: productData - initializing', () => {
    const {
      productionUnit,
      compound,
      dose,
      hashSalt,
      productionTime,
    } = instance.state.productData

    expect(productionUnit).toBe(default_productionUnit)
    expect(compound).toBe(default_compound)
    expect(dose).toBe(default_dose)
    expect(hashSalt).toMatch(default_hashSalt)
    expect(productionTime).toMatch(default_productionTime)
  })

  // TODO: state: productDataHash

  test('state: drugMetaData - initializing', () => {
    expect(instance.state.drugMetaData).toEqual({
      productionUnit: default_productionUnit,
    })
  })

  test('state: manfacturedDrugs - initializing', () => {
    // 2x drugs are manufactured during mounting (via .setupDemoChain())
    expect(instance.state.manufacturedDrugs).toEqual(default_manufacturedDrugs)
  })

  test('state: genuineDrugs - initializing', () => {
    // 2x drugs are manufactured during mounting (via .setupDemoChain())
    // 1x if the 2x drug is checked OUT during mounting (via .setupDemoChain()) leaving 1x genuine drug left
    expect(instance.state.genuineDrugs).toEqual([default_manufacturedDrugs[1]])
  })

  test('state: patientDrugHistory - initializing', () => {
    // 2x drugs are manufactured during mounting (via .setupDemoChain())
    // 1x if the 2x drug is checked OUT during mounting (via .setupDemoChain())
    const patientDrugHistory = [
      {
        dateTaken: new Date('2018-08-03T14:00:00.000Z'),
        productData: default_manufacturedDrugs[0],
      },
    ]
    expect(instance.state.patientDrugHistory).toEqual(patientDrugHistory)
  })

  test('state: prescriptionDose - initializing', () => {
    expect(instance.state.prescriptionDose).toEqual(default_prescriptionDose)
  })

  // Private functions
  test('makeHashSalt (private function)', () => {
    const hashSalt = instance.makeHashSalt()
    expect(hashSalt).toMatch(default_hashSalt)
  })

  test('getDefaultproductData (private function)', () => {
    // Calling it with all arguments (different from default args)
    const [productionUnitTest, productionTimeTest, hashSaltTest] = [
      'Company Name',
      '2020-12-24 24:00',
      '009FG ABCDE',
    ]
    const {
      productionUnit,
      compound,
      dose,
      hashSalt,
      productionTime,
    } = instance.getDefaultproductData(
      productionUnitTest,
      productionTimeTest,
      hashSaltTest
    )

    expect(productionUnit).toBe(productionUnitTest)
    expect(compound).toBe(default_compound)
    expect(dose).toBe(default_dose)
    expect(hashSalt).toBe(hashSaltTest)
    expect(productionTime).toMatch(productionTimeTest)
  })

  // Public funtions
  test('Dose: Getting and setting', () => {
    // Verify that getting the dose returns a correct number (and not a string)
    expect(instance.getDose()).toBe(5)

    // Verify that changing the dose updates and can be retrieved
    instance.setDose(2)
    expect(instance.state.productData.dose).toBe('2 mg')
    expect(instance.getDose()).toBe(2)
  })

  test('Dose range: Getting', () => {
    expect(instance.getDoseRange()).toEqual({ minDose: 0, maxDose: 40 })
  })
})
