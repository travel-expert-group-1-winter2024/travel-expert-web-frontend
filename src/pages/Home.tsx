import Hero from '@/components/organisms/Hero.tsx'
import PackageList from '@/components/organisms/PackageList.tsx'
import Testimonial from '@/components/organisms/Testimonial.tsx'
import TravelPerks from '@/components/organisms/TravelPerks.tsx'

const Home = () => {
  const packages = [
    {
      id: 1,
      pkgName: 'Package 1',
      pkgDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pkgStartDate: new Date(),
      pkgEndDate: new Date(),
      pkgBasePrice: 1000,
      pkgAgencyCommission: 100,
    },
    {
      id: 2,
      pkgName: 'Package 2',
      pkgDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pkgStartDate: new Date(),
      pkgEndDate: new Date(),
      pkgBasePrice: 2000,
      pkgAgencyCommission: 200,
    },
    {
      id: 3,
      pkgName: 'Package 3',
      pkgDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pkgStartDate: new Date(),
      pkgEndDate: new Date(),
      pkgBasePrice: 3000,
      pkgAgencyCommission: 300,
    },
  ]

  const testimonials = [
    {
      quote:
        'Booking with Travel Experts was the best decision. They took care of everything — flights, hotels, even local guides!',
      name: 'Jessica M.',
      username: '@jess.in.motion',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    {
      quote:
        'The trip to Iceland was absolutely magical. Everything went smoothly, and the itinerary was perfect.',
      name: 'Daniel R.',
      username: '@danielr_travels',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      quote:
        'Incredible service and support. They helped me plan a surprise trip for my anniversary, and it was flawless!',
      name: 'Priya K.',
      username: '@wander.priya',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      quote:
        'I loved the flexibility and transparency throughout the process. Highly recommend Travel Experts to everyone.',
      name: 'Lucas B.',
      username: '@lucasb',
      avatar: 'https://randomuser.me/api/portraits/men/90.jpg',
    },
  ]

  return (
    <>
      <Hero />
      <TravelPerks />
      <PackageList packages={packages} />
      <Testimonial testimonials={testimonials} />
    </>
  )
}

export default Home
