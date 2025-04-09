import defaultProfile from '@/assets/user-default-avatar.png'
import { Customer } from '@/types/customer'
import { /*useEffect,*/ useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
// import { useCustomer } from '@/hooks/useCustomer.ts'
import { EditIcon } from 'lucide-react'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'

const data: Customer = {
  customerId: 105,
  custFirstName: 'Elahe',
  custLastName: 'Vafai',
  custEmail: 'elahe@example.com',
  custBusPhone: '403-555-1234',
  custHomePhone: '403-555-5678',
  custAddress: '123 Main St',
  custCity: 'Calgary',
  custProv: 'AB',
  custPostal: 'T2X 1A4',
  custCountry: 'Canada',
  points: 300,
  balance: 125.75,
  custProfilePic: '',
}

type CustomerKey = keyof Customer

const fields: { label: string; name: CustomerKey }[] = [
  { label: 'First Name', name: 'custFirstName' },
  { label: 'Last Name', name: 'custLastName' },
  { label: 'Email', name: 'custEmail' },
  { label: 'Business Phone', name: 'custBusPhone' },
  { label: 'Home Phone', name: 'custHomePhone' },
  { label: 'Address', name: 'custAddress' },
  { label: 'City', name: 'custCity' },
  { label: 'Province', name: 'custProv' },
  { label: 'Postal Code', name: 'custPostal' },
  { label: 'Country', name: 'custCountry' },
]

const profileSchema = z.object({
  custFirstName: z.string().min(2, 'First name is required'),
  custLastName: z.string().min(2, 'Last name is required'),
  custEmail: z.string().email('Invalid email'),
  custBusPhone: z.string().optional(),
  custHomePhone: z.string().optional(),
  custAddress: z.string().min(2, 'Address is required'),
  custCity: z.string().min(2, 'City is required'),
  custProv: z.string().min(2, 'Province is required'),
  custPostal: z.string().min(2, 'Postal code is required'),
  custCountry: z.string().min(2, 'Country is required'),
})

const Profile = () => {
  // const { data, isLoading, error } = useCustomer(id)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [customer, setCustomer] = useState<Customer>(data)
  const [editMode, setEditMode] = useState(false)
  const [editedCustomer, setEditedCustomer] = useState<Customer>(data)
  const [imagePreview, setImagePreview] = useState<string>(
    data.custProfilePic || defaultProfile,
  )
  const [errors, setErrors] = useState<Partial<Record<CustomerKey, string>>>({})

  // useEffect(() => {
  //   setCustomer(data)
  //   setEditedCustomer(data)
  //   setImagePreview(data.custProfilePic || defaultProfile )
  // }, [data])

  // if (isLoading) return <p>Loading...</p>
  // if (error) return <p>Error loading customer. Please try again later.</p>

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedCustomer({ ...editedCustomer, [name]: value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setEditedCustomer((prev) => ({
          ...prev,
          custProfilePic: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setImagePreview(defaultProfile)
    setEditedCustomer((prev) => ({ ...prev, custProfilePic: '' }))
  }

  const handleSave = () => {
    const validation = profileSchema.safeParse(editedCustomer)
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors
      const formattedErrors = Object.fromEntries(
        Object.entries(fieldErrors).map(([key, val]) => [key, val?.[0]]),
      ) as Partial<Record<CustomerKey, string>>
      setErrors(formattedErrors)
      toast.error('Please fix the validation errors.')
      return
    }

    setErrors({})
    setCustomer(editedCustomer)
    setEditMode(false)
    toast.success('Profile updated successfully!')
  }

  const handleCancel = () => {
    setEditedCustomer(customer)
    setImagePreview(customer.custProfilePic || defaultProfile)
    setErrors({})
    setEditMode(false)
  }

  const renderItem = (name: string, value: number | string | undefined) => (
    <div className='flex items-center'>
      <p className='w-[120px] text-sm text-gray-500'>{name}</p>
      <p className='flex-1 bg-gray-50 px-3 py-1 text-lg font-semibold'>
        {value}
      </p>
    </div>
  )

  return (
    <div className='relative flex flex-col items-center'>
      <div className='w-full bg-white'>
        <div className='flex flex-col items-center bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 py-4'>
          <div className='relative'>
            <img
              src={imagePreview}
              alt='Profile'
              className={`h-32 w-32 rounded-full object-cover ${editMode ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (editMode) fileInputRef.current?.click()
              }}
            />
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              ref={fileInputRef}
              className='hidden'
            />
          </div>

          {editMode && (
            <div className='mt-2 flex flex-col items-center'>
              <button
                onClick={handleDeleteImage}
                className='mt-1 text-white hover:underline'
              >
                Delete Photo
              </button>
            </div>
          )}
        </div>

        {/* Info Fields */}
        <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {fields.map((field) => (
            <div className='flex flex-col'>
              <div key={field.name} className='flex items-center'>
                <p className='w-[120px] text-sm text-gray-500'>{field.label}</p>
                {editMode ? (
                  <>
                    <input
                      type='text'
                      name={field.name}
                      value={editedCustomer[field.name] || ''}
                      onChange={handleChange}
                      className='w-full rounded-lg border border-gray-300 p-2'
                    />
                  </>
                ) : (
                  <p className='flex-1 bg-gray-50 px-3 py-1 text-lg font-semibold'>
                    {customer[field.name]}
                  </p>
                )}
              </div>
              {editMode && errors[field.name] && (
                <p className='mt-1 -mb-5 ml-[100px] text-sm text-red-500'>
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Points and Balance */}
        {!editMode && (
          <div className='mt-6 grid grid-cols-2 gap-4'>
            {renderItem('Points', customer.points)}
            {renderItem('Balance', customer.balance?.toFixed(2))}
          </div>
        )}

        {/* Action Buttons */}
        <div className='mt-8 flex justify-end gap-4'>
          {editMode ? (
            <div className='flex flex-1 justify-end gap-4 border-t-1 pt-4'>
              <button
                onClick={handleCancel}
                className='rounded-lg bg-gray-400 px-6 py-2 font-medium text-white hover:bg-gray-500'
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className='rounded-lg bg-blue-400 px-6 py-2 font-medium text-white hover:bg-blue-400'
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className='absolute top-2 right-2 w-10 cursor-pointer rounded-lg font-medium text-white'
            >
              <EditIcon />
            </button>
          )}
        </div>
      </div>

      <ToastContainer position='top-center' autoClose={2000} />
    </div>
  )
}

export default Profile
