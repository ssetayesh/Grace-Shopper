/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Home from '../client/components/Home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Home', () => {
  let home

  beforeEach(() => {
    home = shallow(<Home />)
  })

  it('renders websites name in h1', () => {
    expect(home.find('h1').text()).to.be.equal('Wanderers')
  })
  it('renders correct description in h2', () => {
    expect(home.find('h2').text()).to.be.equal('The first store for wands')
  })
})
