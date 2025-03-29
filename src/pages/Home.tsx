import Hero from '@/components/organisms/Hero.tsx'
import PackageList from '@/components/organisms/PackageList.tsx'
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

  return (
    <>
      <Hero />
      <TravelPerks />
      <PackageList packages={packages} />
    </>
  )
}

export default Home
