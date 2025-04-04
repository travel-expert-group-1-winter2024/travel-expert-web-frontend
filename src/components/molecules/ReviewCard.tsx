import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

interface ReviewProps {
  name: string
  rating: number
  date: string
  comment: string
  avatar?: string
}

export function ReviewCard({ name, rating, date, comment, avatar }: ReviewProps) {
  return (
    <div className="space-y-4 border-b pb-6 last:border-0">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{name}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">{date}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700">{comment}</p>
    </div>
  )
}