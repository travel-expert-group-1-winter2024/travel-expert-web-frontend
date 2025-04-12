import { PackageCard } from '@/components/molecules/PackageCard.tsx'
import { Command, CommandInput } from '@/components/ui/command.tsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { useSearchAndSortPackage } from '@/hooks/useSearchAndSortPackage.ts'
import { useState } from 'react'

export function PackageList() {
  const [search, setSearch] = useState('')
  const [sortOption, setSortOption] = useState('destination-asc')
  const [sortBy, order] = sortOption.split('-') as [
    'destination' | 'price',
    'asc' | 'desc',
  ]
  const { data, isLoading, error } = useSearchAndSortPackage({
    search,
    sortBy,
    order,
  })
  const packages = isLoading || error ? [] : (data ?? [])

  const sortOptions = [
    { value: 'destination-asc', label: 'Destination (A-Z)' },
    { value: 'destination-desc', label: 'Destination (Z-A)' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
  ]

  return (
    <div className='p-7'>
      <div className='container mx-auto'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Package List</h1>
          <p className='text-muted-foreground'>
            Choose your next adventure from our curated packages.
          </p>
        </div>
        <div className='mt-6 flex flex-col gap-4 md:flex-row'>
          <Command className='w-full rounded-lg border'>
            <CommandInput
              placeholder='Type a search...'
              onValueChange={setSearch}
            />
          </Command>
          <Select onValueChange={setSortOption}>
            <SelectTrigger className='w-full md:w-64'>
              <SelectValue placeholder='Select a sort option' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {packages.map((pkg) => (
            <PackageCard pkg={pkg} />
          ))}
        </div>
      </div>
    </div>
  )
}
