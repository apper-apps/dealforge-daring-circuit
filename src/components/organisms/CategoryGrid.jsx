import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const CategoryGrid = () => {
  const categories = [
    {
      name: 'Marketing',
      description: 'Email, social media, and growth tools',
      icon: 'Megaphone',
      color: 'from-purple-500 to-pink-500',
      count: 45
    },
    {
      name: 'Productivity',
      description: 'Project management and workflow tools',
      icon: 'CheckSquare',
      color: 'from-blue-500 to-cyan-500',
      count: 32
    },
    {
      name: 'Design',
      description: 'Creative and design software',
      icon: 'Palette',
      color: 'from-green-500 to-teal-500',
      count: 28
    },
    {
      name: 'Development',
      description: 'Developer tools and platforms',
      icon: 'Code',
      color: 'from-orange-500 to-red-500',
      count: 24
    },
    {
      name: 'Analytics',
      description: 'Data and analytics platforms',
      icon: 'BarChart3',
      color: 'from-indigo-500 to-purple-500',
      count: 18
    },
    {
      name: 'Communication',
      description: 'Team collaboration tools',
      icon: 'MessageSquare',
      color: 'from-yellow-500 to-orange-500',
      count: 22
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4 font-display"
          >
            Shop by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Find the perfect software solutions for your business needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to={`/browse?category=${category.name.toLowerCase()}`}
                className="group block"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-brand-200 overflow-hidden relative">
                  {/* Background Gradient */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.color} opacity-10 rounded-full transform translate-x-8 -translate-y-8`}></div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <ApperIcon name={category.icon} size={32} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors font-display">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.count} deals available
                    </span>
                    <div className="flex items-center text-brand-600 group-hover:text-brand-700">
                      <span className="text-sm font-medium">Explore</span>
                      <ApperIcon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid