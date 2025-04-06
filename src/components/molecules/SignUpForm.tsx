import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  buildAddressSchema,
  buildCityCountrySchema,
  buildEmailAddressSchema,
  buildNameSchema,
  buildPhoneNumberSchema,
  buildPostalCodeSchema,
} from '../../utils/validations/signUpValidation.tsx'

const provinces = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
  'Northwest Territories',
  'Nunavut',
]

const dropDownProvinces = [
  {
    value: 'Alberta',
    label: 'AB',
  },
  {
    value: 'British Columbia',
    label: 'BC',
  },
  {
    value: 'Manitoba',
    label: 'MB',
  },
  {
    value: 'New Brunswick',
    label: 'NB',
  },
  {
    value: 'Newfoundland and Labrador',
    label: 'NL',
  },
  {
    value: 'Northwest Territories',
    label: 'NT',
  },
  {
    value: 'Nova Scotia',
    label: 'NS',
  },
  {
    value: 'Nunavut',
    label: 'NU',
  },
  {
    value: 'Ontario',
    label: 'ON',
  },
  {
    value: 'Prince Edward Island',
    label: 'PE',
  },
  {
    value: 'Quebec',
    label: 'QC',
  },
  {
    value: 'Saskatchewan',
    label: 'SK',
  },
  {
    value: 'Yukon',
    label: 'YT',
  },
]

//Using Zod to declare a schema for the LoginForm
const formSchema = z.object({
  firstName: buildNameSchema('first name'),
  lastName: buildNameSchema('last name'),
  address: buildAddressSchema,
  city: buildCityCountrySchema('city'),

  province: z
    .string({
      required_error: 'Please provide a valid province',
    })
    .trim()
    .refine((value) => provinces.includes(value), {
      message: 'Please select a valid province from the list',
    }),

  postalCode: buildPostalCodeSchema,
  country: buildCityCountrySchema('country'),
  homePhone: buildPhoneNumberSchema('home phone'),
  businessPhone: buildPhoneNumberSchema('business phone'),
  emailAddress: buildEmailAddressSchema,
})

//Defining the form
export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      country: '',
      homePhone: '',
      businessPhone: '',
      emailAddress: '',
    },
  })

  // Defining a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const [open, setOpen] = React.useState(false)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = React.useState('')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          name='firstName'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder={'First Name'} {...field} />
              </FormControl>
              <FormDescription>Please provide your first name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='lastName'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder={'Last Name'} {...field} />
              </FormControl>
              <FormDescription>Please provide your last name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='address'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder={'Address'} {...field} />
              </FormControl>
              <FormDescription>Please provide your address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='city'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder={'City'} {...field} />
              </FormControl>
              <FormDescription>Please provide your city.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*Province goes here*/}
        <FormField
          control={form.control}
          name='province'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Province</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-[200px] justify-between'
                  >
                    {field.value
                      ? dropDownProvinces.find((p) => p.value === field.value)
                          ?.label
                      : 'Select province...'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder='Search province...' />
                    <CommandList>
                      <CommandEmpty>No provinces found.</CommandEmpty>
                      <CommandGroup>
                        {dropDownProvinces.map((p) => (
                          <CommandItem
                            key={p.value}
                            value={p.value}
                            onSelect={(currentValue) => {
                              field.onChange(currentValue)
                              setValue(currentValue)
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                field.value === p.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {p.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>Please select your province.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='postalCode'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder={'A1A 1A1'} {...field} />
              </FormControl>
              <FormDescription>
                Please provide your postal code.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='country'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder={'Canada'} {...field} />
              </FormControl>
              <FormDescription>Please provide your country.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='homePhone'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home Phone Number</FormLabel>
              <FormControl>
                <Input placeholder={'403-111-1234'} {...field} />
              </FormControl>
              <FormDescription>
                Please provide your home phone number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='businessPhone'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Phone Number</FormLabel>
              <FormControl>
                <Input placeholder={'587-222-1234'} {...field} />
              </FormControl>
              <FormDescription>
                Please provide your business phone number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='emailAddress'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder={'vacationTraveler@example.com'}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please provide your email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Sign up!</Button>
      </form>
    </Form>
  )
}
