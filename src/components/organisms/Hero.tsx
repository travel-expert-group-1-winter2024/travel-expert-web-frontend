import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router-dom'

export default function Hero() {
  return (
    <section className='relative w-full bg-gradient-to-br from-[#6B46C1] via-[#B794F4] to-[#FAF5FF] py-24'>
      <div className='container mx-auto flex flex-col-reverse items-center gap-12 px-6 md:flex-row md:justify-between md:gap-16'>
        {/* Text Content */}
        <div className='max-w-xl text-center md:text-left'>
          <h1 className='text-4xl leading-tight font-bold text-white md:text-5xl'>
            Your Next Great Adventure Awaits
          </h1>
          <p className='mt-4 text-lg text-white/80'>
            Discover top-rated destinations, unique experiences, and tailored
            travel plans just for you.
          </p>
          <div className='mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-start'>
            <NavLink to='/#packages'>
              <Button
                size='lg'
                className='bg-[#553C9A] font-semibold text-white shadow-md hover:bg-[#6B46C1]'
              >
                Get Started
              </Button>
            </NavLink>
            <NavLink to='/#travel-perks'>
              <Button
                variant='outline'
                size='lg'
                className='border-white bg-white text-purple-700 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700'
              >
                Learn More
              </Button>
            </NavLink>
          </div>
        </div>

        {/* Visual Decoration - Stacked Photos */}
        <div className='relative flex w-full max-w-md items-center justify-center xl:max-w-2xl'>
          <div className='absolute -top-12 -left-12 z-0 h-48 w-48 rounded-full bg-purple-300/30 blur-3xl'></div>
          <div className='relative z-10 h-[500px] w-full xl:h-[600px]'>
            {/* Center image in collage*/}
            <img
              src='/images/hero/new-york.jpg'
              alt='New York'
              className='absolute top-[25%] left-1/2 h-50 w-56 -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] rounded-xl object-cover shadow-xl ring-2 ring-white xl:h-96 xl:w-80'
            />
            {/* Left image in collage*/}
            <img
              src='/images/hero/canada.jpg'
              alt='Canada'
              className='absolute top-[30%] left-[5%] h-60 w-48 rotate-[-4deg] rounded-xl object-cover shadow-md ring-2 ring-white xl:h-96 xl:w-80'
            />
            {/* Right image in collage*/}
            <img
              src='/images/hero/japan.jpg'
              alt='Japan'
              className='absolute top-[10%] right-[5%] h-64 w-52 rotate-3 rounded-xl object-cover shadow-lg ring-2 ring-white xl:h-72 xl:w-56'
            />
            {/* Bottom image in collage*/}
            <img
              src='/images/hero/europe.jpg'
              alt='Europe'
              className='absolute bottom-0 left-[35%] h-64 w-52 rotate-[-2deg] rounded-xl object-cover shadow-lg ring-2 ring-white xl:h-[20rem] xl:w-[18rem]'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
