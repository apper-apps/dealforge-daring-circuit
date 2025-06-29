import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ onSearch, placeholder = "Search for software deals...", className = "" }) => {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
    // Trigger search on every keystroke for better UX
    onSearch?.(e.target.value)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative ${className}`}
      animate={{ scale: isFocused ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white shadow-sm transition-all duration-200"
        />
        
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ApperIcon name="Search" size={20} className="text-gray-400" />
        </div>
        
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            type="button"
            onClick={() => {
              setQuery('')
              onSearch?.('')
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="X" size={20} />
          </motion.button>
        )}
      </div>
    </motion.form>
  )
}

export default SearchBar