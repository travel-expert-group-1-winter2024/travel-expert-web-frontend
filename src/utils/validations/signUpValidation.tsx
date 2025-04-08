//! VALIDATION SCHEMAS

import { z } from 'zod'

export const buildNameSchema = (fieldname: string) =>
  z
    .string({
      required_error: `Please provide your ${fieldname}.`,
      invalid_type_error: `${fieldname} is not in a valid format. Please try again.`,
    })
    .min(2, 'Must be at least 2 characters')
    .max(25, "That's a really long entry, please keep it under 25 characters")
    .regex(
      /^[A-Za-zÀ-ÿ' -]+$/,
      'Only letters, spaces, hyphens, and apostrophes are allowed',
    )
    .trim()

export const buildCityCountrySchema = (fieldname: string) =>
  z
    .string({
      required_error: `Please provide your ${fieldname}.`,
      invalid_type_error: `${fieldname} is not in a valid format. Please try again.`,
    })
    .min(2, 'Must be at least 2 characters')
    .max(25, "That's a really long entry, please keep it under 25 characters")
    .regex(
      /^[A-Za-z]+$/,
      `${fieldname} entry can only contain letters of the alphabet`,
    )
    .trim()

export const buildPhoneNumberSchema = (fieldname: string) =>
  z
    .string({
      required_error: `Please provide your ${fieldname}.`,
      invalid_type_error: `${fieldname} is not in a valid format. Please try again`,
    })
    .length(10, `The ${fieldname} entry must be 10 characters`)
    .trim()
    .regex(/^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/, {
      message: `${fieldname} must follow the format: XXX-XXX-XXXX or XXX XXX XXXX`,
    })
    .transform((value) => {
      // Remove non-digit characters (dashes, spaces, etc.)
      return value.replace(/\D/g, '') // Remove anything that's not a digit
    })

export const buildAddressSchema = z
  .string({
    required_error: `Please provide a valid address.`,
    invalid_type_error: `The address format is incorrect. Ensure it includes the street number and valid street type`,
  })
  .regex(
    /^\d+\s[A-Za-z0-9\s]+(?:St|Ave|Rd|Blvd|Dr|Pl|Cres|Ln|Way|Terr|Trail|Court|Hwy)\.?$/,
    {
      message:
        'The address must include a street number and type, like this: 1301 16 Ave NW',
    },
  )
  .trim()

export const buildPostalCodeSchema = z
  .string({
    required_error: 'Please provide a valid postal code',
    invalid_type_error:
      'The postal code format is incorrect, please ensure you use the Canadian format: A1A 1A1',
  })
  .regex(/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/, {
    message: 'Postal code must follow this format: A1A 1A1',
  })
  .trim()

export const buildEmailAddressSchema = z
  .string()
  .email({
    message: 'Please provide a valid email address',
  })
  .trim()

export const buildPasswordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[@$!%*?&]/, {
    message: 'Password must contain at least one special character',
  })
  .trim()
