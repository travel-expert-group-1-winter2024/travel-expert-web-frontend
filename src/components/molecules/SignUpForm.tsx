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
import { useSignUp } from '@/hooks/useSignUp.ts'
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
  buildPasswordSchema,
  buildPhoneNumberSchema,
  buildPostalCodeSchema,
} from '../../utils/validations/signUpValidation.tsx'

const dropDownProvinces = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'YT', label: 'Yukon' },
]

//Using Zod to declare a schema for the LoginForm
const formSchema = z
  .object({
    custfirstname: buildNameSchema('first name'),
    custlastname: buildNameSchema('last name'),
    custaddress: buildAddressSchema,
    custcity: buildCityCountrySchema('city'),

    custprov: z
      .string({
        required_error: 'Please provide a valid province',
      })
      .trim(),

    custpostal: buildPostalCodeSchema,
    custcountry: buildCityCountrySchema('country'),
    custhomephone: buildPhoneNumberSchema('home phone'),
    custbusphone: buildPhoneNumberSchema('business phone'),
    custemail: buildEmailAddressSchema,
    password: buildPasswordSchema,
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

//Defining the form
export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      custfirstname: '',
      custlastname: '',
      custaddress: '',
      custcity: '',
      custprov: '',
      custpostal: '',
      custcountry: '',
      custhomephone: '',
      custbusphone: '',
      custemail: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { mutate: signUp } = useSignUp()

  // Defining a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...submitData } = values
    console.log(submitData)
    signUp(submitData)
  }

  const [open, setOpen] = React.useState(false)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = React.useState('')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
          <FormField
            name='custfirstname'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder={'First Name'} {...field} />
                </FormControl>
                <FormDescription>
                  Please provide your first name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='custlastname'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder={'Last Name'} {...field} />
                </FormControl>
                <FormDescription>
                  Please provide your last name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='custaddress'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    className='w-full'
                    placeholder={'Address'}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Please provide your address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='custcity'
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
            name='custprov'
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
            name='custpostal'
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
            name='custcountry'
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
            name='custhomephone'
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
            name='custbusphone'
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
            name='custemail'
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

          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder={'secret'} {...field} />
                </FormControl>
                <FormDescription>Please provide your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='confirmPassword'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder={'secret'} {...field} />
                </FormControl>
                <FormDescription>Please confirm your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-center sm:col-span-2'>
          <Button type='submit' className='w-full sm:w-auto'>
            Sign up!
          </Button>
        </div>
        <div className='flex justify-center sm:col-span-2'>
          <p>
            Already have an account? <a href={'/login'}>Log in instead</a>
          </p>
        </div>
      </form>
    </Form>
  )
}
