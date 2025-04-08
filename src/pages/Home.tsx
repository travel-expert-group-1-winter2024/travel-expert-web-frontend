import Hero from '@/components/organisms/Hero.tsx'
import PackageExample from '@/components/organisms/PackageExample.tsx'
import Testimonial from '@/components/organisms/Testimonial.tsx'
import TravelPerks from '@/components/organisms/TravelPerks.tsx'

const Home = () => {
  return (
    <>
      <Hero />
      <TravelPerks />
      <PackageExample />
      <Testimonial />
    </>
  )
}

export default Home
