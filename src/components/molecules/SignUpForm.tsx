import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Todo: Build out formSchema and validations
// TOdo: Import PopOver to make Combobox component
// Todo: Build Sign up form Component.

import { Button } from '@/components/ui/button'

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
]

//Using Zod to declare a schema for the LoginForm
const formSchema = z.object({
  firstName: z
    .string({
      required_error: 'Please provide your first name.',
      invalid_type_error:
        'The first name entry is not in a valid format. Please ensure you use only letters',
    })
    .regex(/^[A-Za-z]+$/, {
      message:
        'First name can only contain letters (no numbers or special characters)',
    })
    .trim(),

  lastName: z
    .string({
      required_error: 'Please provide your last name',
      invalid_type_error:
        'The last name entry is not in a valid format. Please ensure you use only letters',
    })
    .regex(/^[A-Za-z]+$/, {
      message:
        'Last name can only contain letters (no numbers or special characters)',
    })
    .trim(),

  address: z
    .string({
      required_error: 'Please provide a valid address',
      invalid_type_error:
        'The address format is incorrect. Ensure it includes the street number and valid street type',
    })
    .regex(
      /^\d+\s[A-Za-z0-9\s]+(?:St|Ave|Rd|Blvd|Dr|Pl|Cres|Ln|Way|Terr|Trail|Court|Hwy)\.?$/,
      {
        message:
          'The address must include a street number and type, like this: 1301 16 Ave NW',
      },
    )
    .trim(),

  city: z
    .string({
      required_error: 'Please provide a valid city',
      invalid_type_error:
        'The city format is incorrect. Ensure you use only letters',
    })
    .regex(/^[A-Za-z]+$/, {
      message:
        'City can only contain letters (no numbers or special characters)',
    })
    .trim(),

  province: z
    .string({
      required_error: 'Please provide a valid province',
    })
    .trim()
    .refine((value) => provinces.includes(value), {
      message: 'Please select a valid province from the list',
    }),

  postalCode: z
    .string({
      required_error: 'Please provide a valid postal code',
      invalid_type_error:
        'The postal code format is incorrect, please ensure you use the Canadian format: A1A 1A1',
    })
    .regex(/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/, {
      message: 'Postal code must follow this format: A1A 1A1',
    })
    .trim(),

  country: z
    .string({
      required_error: 'Please provide a valid country',
    })
    .regex(/^[A-Za-z\s]+$/, {
      message:
        'Country can only contain letters and spaces (no numbers or special characters)',
    })
    .trim(),

  homePhone: z
    .string({
      required_error: 'Please provide a valid home phone number',
    })
    .trim()
    .regex(/^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/, {
      message:
        'Phone number must follow the format: XXX-XXX-XXXX or XXX XXX XXXX',
    })
    .regex(/^\d{10}$/, {
      message:
        'Phone number must have exactly 10 digits (without spaces or dashes)',
    })
    .transform((value) => {
      // Remove non-digit characters (dashes, spaces, etc.)
      return value.replace(/\D/g, '') // Remove anything that's not a digit
    }),

  businessPhone: z
    .string({
      required_error: 'Please provide a valid business phone number',
    })
    .trim()
    .regex(/^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/, {
      message:
        'Phone number must follow the format: XXX-XXX-XXXX or XXX XXX XXXX',
    })
    .regex(/^\d{10}$/, {
      message:
        'Phone number must have exactly 10 digits (without spaces or dashes)',
    })
    .transform((value) => {
      // Remove non-digit characters (dashes, spaces, etc.)
      return value.replace(/\D/g, '') // Remove anything that's not a digit
    }),

  emailAddress: z
    .string()
    .email({
      message: 'Please provide a valid email address',
    })
    .trim(),
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
          name='firstName'
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
