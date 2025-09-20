import React from 'react'
import Hero from '../Componets/Hero'
import LatestCollection from '../Componets/LatestCollection'
import BestSeller from '../Componets/BestSeller'
import OurPolicy from '../Componets/OurPolicy'
import NewsLetterBox from '../Componets/NewsLetterBox'

const Home = () => {
  return (
    <>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
    </>
  )
}

export default Home