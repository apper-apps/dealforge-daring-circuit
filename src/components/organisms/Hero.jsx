import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Hero = () => {
  const stats = [
    { label: 'Active Deals', value: '200+', icon: 'Zap' },
    { label: 'Money Saved', value: '$2M+', icon: 'DollarSign' },
    { label: 'Happy Customers', value: '50K+', icon: 'Users' },
    { label: 'Average Savings', value: '85%', icon: 'TrendingUp' }
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display leading-tight">
              Premium Software
              <span className="block bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                At Unbeatable Prices
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-brand-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover lifetime deals on the world's best business software. 
              Save up to 95% on tools that will transform your productivity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/browse">
                <Button variant="orange" size="lg" icon="Search" className="text-lg px-8 py-4">
                  Browse All Deals
                </Button>
              </Link>
              <Link to="/browse?featured=true">
                <Button variant="secondary" size="lg" icon="Star" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white hover:text-brand-600">
                  Featured Deals
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={stat.icon} size={32} className="text-orange-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-display">
                  {stat.value}
                </div>
                <div className="text-brand-200">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-brand-200"
          >
            <div className="flex items-center gap-2">
              <ApperIcon name="Shield" size={20} className="text-success-400" />
              <span>60-Day Money Back Guarantee</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-brand-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Award" size={20} className="text-success-400" />
              <span>Verified by 50,000+ Entrepreneurs</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-brand-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Clock" size={20} className="text-success-400" />
              <span>Limited Time Offers</span>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-bounce-subtle">
            <div className="w-8 h-8 bg-orange-400 rounded-full opacity-60"></div>
          </div>
          <div className="absolute top-40 right-20 animate-bounce-subtle" style={{ animationDelay: '1s' }}>
            <div className="w-6 h-6 bg-yellow-400 rounded-full opacity-60"></div>
          </div>
          <div className="absolute bottom-40 left-20 animate-bounce-subtle" style={{ animationDelay: '2s' }}>
            <div className="w-4 h-4 bg-success-400 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero