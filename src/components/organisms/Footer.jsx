import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Blog', href: '/blog' }
      ]
    },
    {
      title: 'For Businesses',
      links: [
        { label: 'Submit Your Deal', href: '/submit' },
        { label: 'Partner Program', href: '/partners' },
        { label: 'Advertise', href: '/advertise' },
        { label: 'API', href: '/api' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Refund Policy', href: '/refunds' },
        { label: 'Terms of Service', href: '/terms' }
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'Discord', href: '/discord' },
        { label: 'Facebook Group', href: '/facebook' },
        { label: 'Newsletter', href: '/newsletter' },
        { label: 'Affiliate Program', href: '/affiliates' }
      ]
    }
  ]

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'Facebook', icon: 'Facebook', href: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
    { name: 'Instagram', icon: 'Instagram', href: '#' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold font-display">DealForge</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Discover premium software deals crafted for entrepreneurs and growing businesses.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors"
                >
                  <ApperIcon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 DealForge. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer