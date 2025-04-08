// import { SignUpFormValues } from '@/types/signUp.ts'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

export function useSignUp() {
  //! The following comments, prefaced with a "?" are for my own understanding of React-Query and Axios
  return useMutation({
    //? React-Query's hook for changing data (POST,PUT,DELETE requests)
    mutationFn: async (formData: unknown) => {
      //? useMutation calls mutationFn which takes the data from the form
      const response = await axios.post(
        'http://localhost:8080/api/customers/register',
        formData,
      ) //? The call to the network, Axios handles JSON Parsing eases error handling.
      return response.data
    },

    onSuccess: (data: unknown) => {
      console.log(data)
      toast.success('Signed up successfully', {
        description: 'Your account has been successfully created!',
      })
    },

    onError: async (error: unknown) => {
      console.log(error)
      toast.error('Account creation failed', {
        description: "We're sorry, something went wrong on our end.",
      })
    },
  })
}
