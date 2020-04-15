import { shallowMount, createLocalVue } from '@vue/test-utils'
import Index from './Index'
import Vuetify from 'vuetify'

const localVue = createLocalVue();
localVue.use(Vuetify)
const dummyRecipes = [{
    "id": "5fb3f8fa",
    "ingredients": [
      {
        "quantity": "3",
        "unit": {
          "name": "cup"
        },
        "ingredient": {
          "name": "Flour",
          "attributes": [
            {
              "calories": 455,
              "unit": {
                "name": "cup"
              }
            }
          ]
        }
      },
      {
        "quantity": "1/4",
        "unit": {
          "name": "cup"
        },
        "ingredient": {
          "name": "Sugar",
          "attributes": [
            {
              "calories": 773,
              "unit": {
                "name": "cup"
              }
            }
          ]
        }
      },
      {
        "quantity": "1",
        "unit": {
          "name": "tablespoon"
        },
        "ingredient": {
          "name": "Salt",
          "attributes": [
            {
              "calories": 0,
              "unit": {
                "name": "cup"
              }
            }
          ]
        }
      },
      {
        "quantity": "1/4",
        "unit": {
          "name": "cup"
        },
        "ingredient": {
          "name": "Vegetable Oil",
          "attributes": [
            {
              "calories": 1927,
              "unit": {
                "name": "cup"
              }
            }
          ]
        }
      },
      {
        "quantity": "1",
        "unit": {
          "name": "cup"
        },
        "ingredient": {
          "name": "Tomato Sauce",
          "attributes": [
            {
              "calories": 90,
              "unit": {
                "name": "cup"
              }
            }
          ]
        }
      },
      {
        "quantity": "6",
        "unit": {
          "name": "oz"
        },
        "ingredient": {
          "name": "Cheese",
          "attributes": [
            {
              "calories": 115,
              "unit": {
                "name": "oz"
              }
            }
          ]
        }
      }
    ],
    "name": "Pizza"
  }]
const wrapper = shallowMount(Index, {
    localVue,
    methods: {
      recipes() {
        return dummyRecipes
      }
    }
  }
)

describe('Index', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('parseQuantity', () => {
    test('will parse 1/2', () => {
      expect(wrapper.vm.parseQuantity('1/2')).toBe(0.5)
    })

    test('will parse 12345', () => {
      expect(wrapper.vm.parseQuantity('12345')).toBe(12345)
    })

    test.skip('will parse 7 3/4', () => { //TODO
      expect(wrapper.vm.parseQuantity('7 3/4')).toBe(7.75)
    })

    test('will parse 17/2', () => {
      expect(wrapper.vm.parseQuantity('17/2')).toBe(8.5)
    })

    test('will not parse 42 42', () => { //Perhaps we'll want to throw an error in this case.
      expect(wrapper.vm.parseQuantity('42 42')).toBe(42)
    })
  })
})
