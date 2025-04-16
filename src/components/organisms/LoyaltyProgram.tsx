import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'
import { Diamond, Gem, Star, Ticket, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const tiers = [
  {
    name: 'Guest',
    icon: <Ticket className='h-6 w-6' />,
    requirement: 'No minimum',
    discount: 'Standard pricing',
    benefits: ['Basic booking access', 'Email support'],
    color: 'bg-gray-100',
    textColor: 'text-gray-600',
    progress: 0,
  },
  {
    name: 'Bronze',
    icon: <Star className='h-6 w-6' />,
    requirement: '5,000 pts ($5,000 spent)',
    discount: '15% off first $10K',
    benefits: [
      'Priority customer service',
      'Early access to deals',
      'Travel concierge',
    ],
    color: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-800',
    progress: 25,
  },
  {
    name: 'Platinum',
    icon: <Gem className='h-6 w-6' />,
    requirement: '20,000 pts ($20,000 spent)',
    discount: '10% off all bookings',
    benefits: [
      'VIP airport services',
      'Free room upgrades',
      '24/7 dedicated agent',
      'Exclusive experiences',
    ],
    color: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-800',
    progress: 100,
  },
]

export function LoyaltyProgram() {
  const navigate = useNavigate()
  return (
    <section className='bg-gradient-to-b from-white to-gray-50 py-16'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='mb-16 text-center'
        >
          <h2 className='bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl'>
            Your Journey, Rewarded
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-lg'>
            Earn points with every dollar spent and unlock exclusive travel
            benefits
          </p>
        </motion.div>

        {/* Progress Visualization */}
        <div className='mx-auto mb-16 max-w-3xl'>
          <div className='text-muted-foreground mb-2 flex justify-between text-sm'>
            <span>Guest</span>
            <span>Bronze (5K pts)</span>
            <span>Platinum (20K pts)</span>
          </div>
          <div className='relative'>
            <Progress value={33} className='h-3 bg-gray-200' />
            <div className='absolute inset-0 flex items-center justify-between px-2'>
              {[0, 25, 100].map((point, i) => (
                <div
                  key={i}
                  className={`h-5 w-5 rounded-full border-4 border-white ${i === 0 ? 'bg-gray-400' : i === 1 ? 'bg-amber-400' : 'bg-blue-500'} shadow-md`}
                  style={{ left: `${point}%`, transform: 'translateX(-50%)' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tier Cards */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className={`h-full rounded-xl border ${tier.color} flex flex-col p-6`}
              >
                <div className='mb-4 flex items-center gap-3'>
                  <div
                    className={`rounded-lg p-2 ${tier.name === 'Platinum' ? 'bg-blue-100' : tier.name === 'Bronze' ? 'bg-amber-100' : 'bg-gray-200'}`}
                  >
                    {tier.icon}
                  </div>
                  <h3 className={`text-xl font-bold ${tier.textColor}`}>
                    {tier.name}
                  </h3>
                  {tier.name !== 'Guest' && (
                    <span className='ml-auto rounded-full border bg-white px-2 py-1 text-xs'>
                      {tier.requirement.split('(')[0].trim()}
                    </span>
                  )}
                </div>

                <div className='mb-6'>
                  <p className='text-muted-foreground text-sm'>Discount</p>
                  <p className='font-semibold'>{tier.discount}</p>
                </div>

                <ul className='mb-6 flex-grow space-y-2'>
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className='flex items-start'>
                      <Zap className='text-primary mt-0.5 mr-2 h-4 w-4 flex-shrink-0' />
                      <span className='text-sm'>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className='mt-auto'>
                  {tier.name === 'Guest' ? (
                    <button
                      className='w-full rounded-lg border bg-white py-2 text-sm transition hover:bg-gray-50'
                      onClick={() =>
                        navigate('/sign-up', {
                          state: { from: location.pathname },
                        })
                      }
                    >
                      Sign up to start earning
                    </button>
                  ) : (
                    <button
                      className={`w-full rounded-lg py-2 text-sm ${tier.name === 'Platinum' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-amber-500 text-white hover:bg-amber-600'} transition`}
                    >
                      {tier.name === 'Platinum'
                        ? 'VIP Services'
                        : 'Upgrade Now'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Points System Explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className='mx-auto mt-16 max-w-4xl rounded-xl border bg-white p-8 shadow-sm'
        >
          <h3 className='mb-4 text-xl font-semibold'>How It Works</h3>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <div className='flex items-start gap-3'>
              <div className='bg-primary/10 rounded-lg p-2'>
                <Diamond className='text-primary h-5 w-5' />
              </div>
              <div>
                <h4 className='font-medium'>Earn Points</h4>
                <p className='text-muted-foreground mt-1 text-sm'>
                  1 point for every $1 spent on bookings
                </p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <div className='rounded-lg bg-green-100 p-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-green-600'
                >
                  <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
                  <polyline points='22 4 12 14.01 9 11.01'></polyline>
                </svg>
              </div>
              <div>
                <h4 className='font-medium'>Automatic Upgrade</h4>
                <p className='text-muted-foreground mt-1 text-sm'>
                  System promotes you when reaching thresholds
                </p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <div className='rounded-lg bg-purple-100 p-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-purple-600'
                >
                  <path d='M12 2v4'></path>
                  <path d='m16.2 7.8 2.9-2.9'></path>
                  <path d='M18 12h4'></path>
                  <path d='m16.2 16.2 2.9 2.9'></path>
                  <path d='M12 18v4'></path>
                  <path d='m7.8 16.2-2.9 2.9'></path>
                  <path d='M6 12H2'></path>
                  <path d='m7.8 7.8-2.9-2.9'></path>
                </svg>
              </div>
              <div>
                <h4 className='font-medium'>Instant Benefits</h4>
                <p className='text-muted-foreground mt-1 text-sm'>
                  Discounts apply immediately after qualifying
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
