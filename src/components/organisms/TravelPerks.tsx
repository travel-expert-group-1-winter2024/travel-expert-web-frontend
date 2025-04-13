import Airplane from '@/assets/airplane.png'
import Compass from '@/assets/compass.png'
import Globe from '@/assets/globe.png'

function TravelPerks() {
  return (
    <section id='travel-perks' className='flex justify-center py-12'>
      <div className='w-11/12 max-w-6xl'>
        <h2 className='text-center text-3xl font-bold'>Why Travel With Us?</h2>
        <p className='mt-4 text-center text-gray-600'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='flex flex-col items-center'>
            <img src={Compass} alt='compass' className='h-16 w-16' />
            <h3 className='mt-4 text-xl font-semibold'>Explore the World</h3>
            <p className='mt-2 text-center text-gray-600'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <img src={Airplane} alt='airplane' className='h-16 w-16' />
            <h3 className='mt-4 text-xl font-semibold'>Comfortable Journey</h3>
            <p className='mt-2 text-center text-gray-600'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <img src={Globe} alt='globe' className='h-16 w-16' />
            <h3 className='mt-4 text-xl font-semibold'>Travel Your Way</h3>
            <p className='mt-2 text-center text-gray-600'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TravelPerks
