import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CountdownTimer = ({ endDate, className = "" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate) - new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2 text-center">
        <div className={`flex gap-1 ${isUrgent ? 'text-red-600' : 'text-orange-600'}`}>
          <motion.div
            animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-lg font-bold">{timeLeft.days}</span>
            <span className="text-xs uppercase tracking-wide">Days</span>
          </motion.div>
          <span className="text-lg font-bold">:</span>
          <motion.div
            animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <span className="text-lg font-bold">{timeLeft.hours}</span>
            <span className="text-xs uppercase tracking-wide">Hrs</span>
          </motion.div>
          <span className="text-lg font-bold">:</span>
          <motion.div
            animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <span className="text-lg font-bold">{timeLeft.minutes}</span>
            <span className="text-xs uppercase tracking-wide">Min</span>
          </motion.div>
          <span className="text-lg font-bold">:</span>
          <motion.div
            animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-lg font-bold">{timeLeft.seconds}</span>
            <span className="text-xs uppercase tracking-wide">Sec</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer