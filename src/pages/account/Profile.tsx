import defaultProfile from '@/assets/user-default-avatar.png'
import { Badge } from '@/components/ui/badge.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
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
  const { user, updateUser, isLoggedIn, isAuthLoading } = useAuth()
  const userPhotoUrl = user?.photoUrl

  const customerId = user?.customerId
  // Fetch customer data
  const {
    customer: customer,
    isLoading,
    error,
    uploadPhoto,
    updateCustomer,
  } = useCustomerById(customerId, userPhotoUrl, isAuthLoading)

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
      setUserProfileImage(userPhotoUrl)
    }
  }, [customer, userPhotoUrl])

  if (isAuthLoading) return <p>Loading auth...</p>
  if (!isLoggedIn) return null
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading customer. Please try again later.</p>
  if (!customer || !editedCustomer) return <p>Customer not found</p>

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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
      let uploadedPhotoUrl: string | null = null

      if (fileInputRef.current?.files?.length) {
        const imageFile = fileInputRef.current.files[0]
        uploadedPhotoUrl = await uploadPhoto(imageFile)
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

        if (uploadedPhotoUrl) {
          updateUser({ photoUrl: uploadedPhotoUrl })
        }

        toast.success('Profile updated successfully!')
      } else {
        toast.info('No changes to save')
      }
    } catch (error) {
      console.error('Update failed:', error)
      toast.error('Failed to update profile')
    }

    setErrors({})
    setEditMode(false)
  }

  const handleCancel = () => {
    if (!customer) return
    setEditedCustomer(customer)
    setErrors({})
    setEditMode(false)
  }

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
        <p className='text-muted-foreground mt-2 text-right text-xs'>
          *Maximum file size: 5 MB
        </p>
        <Badge
          className={`mx-2 ${
            customer.tier === 'Bronze'
              ? 'bg-[#CD7F32] text-white'
              : customer.tier === 'Platinum'
                ? 'bg-[#E5E4E2] text-black'
                : ''
          }`}
        >
          {customer.tier}
        </Badge>
        {/* Points and Balance */}
        <Badge variant='destructive'>
          {customer.points.toLocaleString() + ' pts'}
        </Badge>
        {/* Info Fields */}
        <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {fields.map((field) => (
            <div key={field.name} className='flex flex-col'>
              <div className='flex items-center'>
                <Label className='w-[120px]'>{field.label}</Label>
                {editMode ? (
                  field.name === 'custprov' ? (
                    <ProvinceSelect
                      name={field.name}
                      value={editedCustomer[field.name]}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className='flex-1'>
                      <Input
                        type='text'
                        name={field.name}
                        value={editedCustomer[field.name]}
                        onChange={handleChange}
                        className='rounded-lg border border-gray-300 px-3 py-1'
                      />
                      {editMode && errors[field.name] && (
                        <p className='mt-1 text-sm text-red-500'>
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  )
                ) : field.name === 'custprov' ? (
                  <ProvinceSelect
                    name={field.name}
                    value={customer[field.name]}
                    onChange={() => {}}
                    readOnly
                  />
                ) : (
                  <Input
                    className='flex-1 px-3 py-1'
                    value={customer[field.name]}
                    disabled={true}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

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
                className='rounded-lg bg-blue-400 px-6 py-2 font-medium text-white hover:bg-blue-500'
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

const ProvinceSelect = ({
  name,
  value,
  onChange,
  readOnly = false,
}: {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  readOnly?: boolean
}) => {
  const handleValueChange = (val: string) => {
    if (readOnly) return
    const syntheticEvent = {
      target: { name, value: val },
    } as React.ChangeEvent<HTMLSelectElement>
    onChange(syntheticEvent)
  }

  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue={value}
      disabled={readOnly}
    >
      <SelectTrigger className='flex-1 rounded-lg border border-gray-300 px-3 py-1'>
        <SelectValue placeholder='Select Province' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='AB'>Alberta</SelectItem>
          <SelectItem value='BC'>British Columbia</SelectItem>
          <SelectItem value='MB'>Manitoba</SelectItem>
          <SelectItem value='NB'>New Brunswick</SelectItem>
          <SelectItem value='NL'>Newfoundland and Labrador</SelectItem>
          <SelectItem value='NS'>Nova Scotia</SelectItem>
          <SelectItem value='NT'>Northwest Territories</SelectItem>
          <SelectItem value='NU'>Nunavut</SelectItem>
          <SelectItem value='ON'>Ontario</SelectItem>
          <SelectItem value='PE'>Prince Edward Island</SelectItem>
          <SelectItem value='QC'>Quebec</SelectItem>
          <SelectItem value='SK'>Saskatchewan</SelectItem>
          <SelectItem value='YT'>Yukon</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default Profile
