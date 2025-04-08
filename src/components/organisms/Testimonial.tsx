import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Card, CardContent, CardFooter } from '@/components/ui/card.tsx'

type Testimonial = {
  quote: string
  name: string
  username: string
  avatar: string
}

const testimonials: Testimonial[] = [
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

function Testimonial() {
  return (
    <section className='bg-gradient-to-b from-white to-slate-100 py-16'>
      <div className='mb-12 text-center'>
        <h2 className='text-3xl font-bold'>What Our Travelers Are Saying</h2>
        <p className='text-muted-foreground mx-auto mt-2 max-w-xl'>
          Travel Experts has helped hundreds of travelers book stress-free,
          unforgettable journeys. Here’s what real customers have to say.
        </p>
      </div>
      <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3'>
        {testimonials.map((t, idx) => (
          <Card key={idx} className='shadow-md'>
            <CardContent className='p-6 pb-4'>
              <p className='text-muted-foreground text-sm italic'>
                “{t.quote}”
              </p>
            </CardContent>
            <CardFooter className='flex flex-row items-center gap-4 pt-0'>
              <Avatar>
                <AvatarImage src={t.avatar} alt={t.name} />
                <AvatarFallback>{t.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className='text-sm font-medium'>{t.name}</p>
                <p className='text-muted-foreground text-xs'>{t.username}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Testimonial
