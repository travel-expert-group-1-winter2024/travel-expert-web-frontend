import Hero from '@/components/organisms/Hero.tsx'
import { LoyaltyProgram } from '@/components/organisms/LoyaltyProgram'
import PackageExample from '@/components/organisms/PackageExample.tsx'
import Testimonial from '@/components/organisms/Testimonial.tsx'
import TravelPerks from '@/components/organisms/TravelPerks.tsx'

const Home = () => {
  return (
    <>
      <Hero />
      <TravelPerks />
      <PackageExample />
      <LoyaltyProgram />
      <Testimonial />
    </>
  )
}

export default Home
