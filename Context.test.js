// import { ContextProvider } from './Context'

// describe('ContextProvider', () => {
//   test('it updates dose correctly', () => {
//     const component = create(<ContextProvider />)
//     const instance = component.getInstance()

//     expect(instance.getDose()).toBe(5)
//     expect(instance.state.productData.dose).toBe('5 mg')

//     instance.setDose(2)

//     expect(instance.getDose()).toBe(2)
//     expect(instance.state.productData.dose).toBe('2 mg')
//   })

//   test('it updates something else correctly', () => {
//     // ...
//   })
// })

describe('truth', () => {
  it('is true', () => {
    expect(true).toEqual(true)
  })
})
