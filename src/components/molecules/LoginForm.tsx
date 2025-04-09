import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { Input } from '@/components/ui/input'
import { NavLink } from 'react-router-dom'
import { useAuth } from "@/hooks/useAuth.ts";
import { toast } from "sonner";

//Using Zod to declare a schema for the LoginForm
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid Email Address' }).trim(),
  password: z
    .string()
    // .min(8, { message: 'Password must be at least 8 characters long' })
    // .regex(/[A-Z]/, {
    //   message: 'Password must contain at least one uppercase letter',
    // })
    // .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    // .regex(/[@$!%*?&]/, {
    //   message: 'Password must contain at least one special character',
    // })
    .trim(),
})

//Defining the form
export function LoginForm() {
  const { loginAction } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  // Defining a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    loginAction({
      username: values.email,
      password: values.password,
    }, {onSuccess: () => {
        toast.success('Logged in successfully!')
      },
      onError: (err) => {
        toast.error(`Login failed: ${err.message}`)
      }})
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-8'}>
            <FormField
              name={'email'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder={'Email Address'} {...field} />
                  </FormControl>
                  <FormDescription>
                    Please login with your email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={'password'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Password' {...field} />
                  </FormControl>
                  <FormDescription>Please enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-col gap-3'>
              <Button type='submit' className='w-full'>
                Login
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <NavLink to={'/sign-up'} className='underline underline-offset-4'>
                Sign up
              </NavLink>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
