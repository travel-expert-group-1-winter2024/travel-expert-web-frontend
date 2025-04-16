import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { provinces } from '@/constants/provinces.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const LoginPage: React.FC = () => {
  // const [isAgent, setIsAgent] = useState(false)
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        {/*{isAgent ? (*/}
        {/*  <AgentOnboardingForm />*/}
        {/*) : (*/}
        {/*  <LoginForm*/}
        {/*    onLoginSuccess={(user) => {*/}
        {/*      if (user.roles.includes('AGENT')) {*/}
        {/*        setIsAgent(true)*/}
        {/*      }*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
        <AgentOnboardingForm />
      </div>
    </div>
  )
}

const formSchema = z.object({
  address: z.string().trim(),
  city: z.string().trim(),
  postalCode: z.string().trim(),
  country: z.string().trim(),
  province: z.string().trim(),
})

const formItems: {
  name: 'address' | 'city' | 'postalCode' | 'country' | 'province'
  label: string
  placeholder: string
}[] = [
  {
    name: 'address',
    label: 'Address',
    placeholder: 'Address',
  },
  {
    name: 'city',
    label: 'City',
    placeholder: 'City',
  },
  {
    name: 'postalCode',
    label: 'Postal Code',
    placeholder: 'Postal Code',
  },
  {
    name: 'country',
    label: 'Country',
    placeholder: 'Country',
  },
  {
    name: 'province',
    label: 'Province',
    placeholder: 'Select Province',
  },
]

function AgentOnboardingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      city: '',
      postalCode: '',
      country: '',
      province: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {}
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>We need more information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-2/3 space-y-6'
          >
            {formItems.map((item) => (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name}
                render={({ field }) =>
                  item.name === 'province' ? (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={item.placeholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {provinces.map((province) => (
                            <SelectItem
                              key={province.code}
                              value={province.code}
                            >
                              {province.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  ) : (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <FormControl>
                        <Input placeholder={item.placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }
              />
            ))}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginPage
