import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Globe, Luggage, Rocket, Sparkles } from 'lucide-react'

const perks = [
  {
    icon: <Globe className='text-primary h-10 w-10' />,
    title: 'Explore the World',
    description:
      'Discover hidden gems and iconic landmarks with our expertly curated travel experiences across 100+ countries.',
  },
  {
    icon: <Rocket className='text-primary h-10 w-10' />,
    title: 'Seamless Experience',
    description:
      'From booking to boarding, we handle every detail so you can focus on making memories.',
  },
  {
    icon: <Luggage className='text-primary h-10 w-10' />,
    title: 'Stress-Free Travel',
    description:
      'Enjoy premium services including fast-track check-ins, VIP lounges, and 24/7 concierge support.',
  },
]

function TravelPerks() {
  return (
    <section
      id='travel-perks'
      className='bg-gradient-to-b from-white to-gray-50 py-16 md:py-24'
    >
      <div className='container px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='mx-auto max-w-3xl text-center'
        >
          <h2 className='text-4xl font-bold tracking-tight sm:text-5xl'>
            Why Choose <span className='text-primary'>Our Travel</span>{' '}
            Services?
          </h2>
          <p className='text-muted-foreground mt-4 text-lg'>
            We redefine travel with exceptional service, exclusive benefits, and
            unforgettable experiences tailored just for you.
          </p>
        </motion.div>

        <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-3'>
          {perks.map((perk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className='bg-background hover:border-primary/20 h-full p-8 text-center transition-all hover:shadow-lg'>
                <div className='bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full'>
                  {perk.icon}
                </div>
                <h3 className='mt-6 text-xl font-semibold'>{perk.title}</h3>
                <p className='text-muted-foreground mt-3'>{perk.description}</p>

                <div className='mt-6'>
                  <Sparkles className='text-primary/50 mx-auto h-6 w-6' />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className='mt-16 text-center'
        ></motion.div>
      </div>
    </section>
  )
}

export default TravelPerks
