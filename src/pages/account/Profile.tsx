import defaultProfile from '@/assets/user-default-avatar.png'
import { useAuth } from '@/hooks/useAuth'
import { useCustomerById } from '@/hooks/useCustomer'
import { Customer } from '@/types/customer'
import { EditIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'

type CustomerKey = keyof Customer

const fields: { label: string; name: CustomerKey }[] = [
  { label: 'First Name', name: 'custfirstname' },
  { label: 'Last Name', name: 'custlastname' },
  { label: 'Email', name: 'custemail' },
  { label: 'Business Phone', name: 'custbusphone' },
  { label: 'Home Phone', name: 'custhomephone' },
  { label: 'Address', name: 'custaddress' },
  { label: 'City', name: 'custcity' },
  { label: 'Province', name: 'custprov' },
  { label: 'Postal Code', name: 'custpostal' },
  { label: 'Country', name: 'custcountry' },
]

const profileSchema = z.object({
  custfirstname: z.string().min(2, 'First name is required'),
  custlastname: z.string().min(2, 'Last name is required'),
  custemail: z.string().email('Invalid email'),
  custbusphone: z.string().optional(),
  custhomephone: z.string().optional(),
  custaddress: z.string().min(2, 'Address is required'),
  custcity: z.string().min(2, 'City is required'),
  custprov: z.string().min(2, 'Province is required'),
  custpostal: z.string().min(2, 'Postal code is required'),
  custcountry: z.string().min(2, 'Country is required'),
})

const Profile = () => {
  const { user } = useAuth()
  const customerId = user?.customerId
  // Fetch customer data
  const {
    customer: customer,
    isLoading,
    error,
    uploadPhoto,
    updateCustomer,
  } = useCustomerById(customerId)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [editMode, setEditMode] = useState(false)
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null)
  const [errors, setErrors] = useState<Partial<Record<CustomerKey, string>>>({})
  const [userProfileImage, setUserProfileImage] = useState<string | undefined>(
    defaultProfile,
  )

  // Initialize state when data is loaded
  useEffect(() => {
    if (customer) {
      setEditedCustomer(customer)
    }
  }, [customer])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading customer. Please try again later.</p>
  if (!customer || !editedCustomer) return <p>Customer not found</p>

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedCustomer((prev) => {
      if (!prev) return null
      return { ...prev, [name]: value }
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const previewUrl = reader.result as string
        setUserProfileImage(previewUrl)
        setEditedCustomer((prev) => ({
          ...prev!,
          photoUrl: previewUrl,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!editedCustomer || !customer) return
    try {
      const customerToValidate = {
        ...editedCustomer,
        custfirstname: editedCustomer.custfirstname || '',
        custlastname: editedCustomer.custlastname || '',
        custaddress: editedCustomer.custaddress || '',
        custcity: editedCustomer.custcity || '',
        custprov: editedCustomer.custprov || '',
        custpostal: editedCustomer.custpostal || '',
        custbusphone: editedCustomer.custbusphone || '',
        custemail: editedCustomer.custemail || '',
        photo_path: editedCustomer.photo_path || '',
      }

      const validation = profileSchema.safeParse(customerToValidate)

      if (!validation.success) {
        const fieldErrors = validation.error.flatten().fieldErrors
        const formattedErrors = Object.fromEntries(
          Object.entries(fieldErrors).map(([key, val]) => [
            key,
            val?.[0] || 'Invalid value',
          ]),
        ) as Partial<Record<CustomerKey, string>>

        setErrors(formattedErrors)
        toast.error('Please fix the validation errors.')

        // Log detailed errors for debugging
        console.log('Validation errors:', validation.error.errors)
        return
      }

      const updatePromises = []

      // Check if image was changed (compare with original)
      if (fileInputRef.current?.files?.length) {
        const imageFile = fileInputRef.current.files[0]
        updatePromises.push(uploadPhoto(imageFile))
      }

      // Check if other fields were changed
      const changedFields = Object.keys(editedCustomer).filter(
        (key) =>
          editedCustomer[key as keyof Customer] !==
          customer[key as keyof Customer],
      )

      if (changedFields.length > 0) {
        console.log('changed fields length: ', changedFields.length)
        updatePromises.push(updateCustomer(editedCustomer))
      }
      // 3. Execute all updates
      if (updatePromises.length > 0) {
        await Promise.all(updatePromises)
        setEditMode(false)
      } else {
        toast.info('No changes to save')
      }
    } catch (error) {
      console.error('Update failed:', error)
      toast.error('Failed to update profile')
    }

    setErrors({})
    setEditMode(false)
    toast.success('Profile updated successfully!')
  }

  const handleCancel = () => {
    if (!customer) return
    setEditedCustomer(customer)
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
              src={userProfileImage}
              alt='Profile'
              className={`h-32 w-32 rounded-full object-cover ${editMode ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (editMode) fileInputRef.current?.click()
              }}
              onError={(e) => {
                console.error('Image failed to load:', e)
                e.currentTarget.src = defaultProfile
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
        </div>

        {/* Info Fields */}
        <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {fields.map((field) => (
            <div key={field.name} className='flex flex-col'>
              <div className='flex items-center'>
                <p className='w-[120px] text-sm text-gray-500'>{field.label}</p>
                {editMode ? (
                  <input
                    type='text'
                    name={field.name}
                    value={editedCustomer[field.name]}
                    onChange={handleChange}
                    className='w-full rounded-lg border border-gray-300 p-2'
                  />
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
