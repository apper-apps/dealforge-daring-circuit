import { format } from 'date-fns'

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount)
}

export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  return format(new Date(date), formatString)
}

export const calculateDiscount = (originalPrice, salePrice) => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number)
}

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getTimeUntil = (endDate) => {
  const now = new Date()
  const end = new Date(endDate)
  const timeDiff = end.getTime() - now.getTime()
  
  if (timeDiff <= 0) {
    return { expired: true }
  }
  
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
  
  return { days, hours, minutes, seconds, expired: false }
}