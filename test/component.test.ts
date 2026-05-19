import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import KeramzitCard from '../src/components/KeramzitCard.vue'
import { keramzitProducts } from '../src/data/keramzit-products'

describe('component of KeramzitCard.vue', () => {
  it('should render keramzit product data', () => {
    const product = keramzitProducts[0]
    const wrapper = mount(KeramzitCard, {
      props: product,
      global: {
        stubs: {
          RouterLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain(product.name)
    expect(wrapper.text()).toContain(product.price.toLocaleString('ru-RU'))
  })

  it('should link to product page when target exists', () => {
    const product = keramzitProducts[1]
    const wrapper = mount(KeramzitCard, {
      props: product,
      global: {
        stubs: {
          RouterLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
          },
        },
      },
    })

    expect(wrapper.attributes('href')).toBe(product.to)
    expect(wrapper.text()).toContain('Подробнее')
  })
})
