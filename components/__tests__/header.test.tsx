import React from 'react'
import { mount } from 'enzyme'
import Header from '../Header'

const title = 'test title'

describe('Header Component', () => {
  it('should include title within h1', () => {
    const subject = mount(<Header title={title} />)

    expect(subject.find('h1')).toHaveLength(1)
    expect(subject.text()).toEqual(title)
  })
})
