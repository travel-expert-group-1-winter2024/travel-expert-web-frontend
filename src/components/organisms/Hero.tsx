import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router-dom'

export default function Hero() {
  return (
    <section className='relative h-[600px] w-full overflow-hidden'>
      <img
        src='/images/hero.jpg'
        alt='Hero Background'
        className='absolute inset-0 h-full w-full object-cover'
      />

      <div className='absolute inset-0 bg-black/10' />
      <div className='relative z-10 flex h-full items-center px-6 md:px-20'>
        <div className='max-w-xl space-y-6'>
          <h1 className='text-4xl leading-tight font-bold text-white md:text-5xl'>
            Discover Your Next Adventure
          </h1>
          <p className='text-muted text-lg'>
            Explore top-rated destinations and plan your perfect trip with us.
          </p>
          <div className='flex gap-4'>
            <NavLink to='/#packages'>
              <Button size='lg'>Get Started</Button>
            </NavLink>
            <NavLink to={'/#travel-perks'}>
              <Button variant='outline' size='lg'>
                Learn More
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}
