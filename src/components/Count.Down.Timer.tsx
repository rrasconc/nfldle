import moment from 'moment'
import { useEffect, useState } from 'react'
import { TimeLeft } from '../constants/types'
import { AnimatePresence, motion } from 'framer-motion'

export function CountDownTimer() {
  const [countdown, setCountdown] = useState<TimeLeft>()

  const getTimeLeft = () => {
    const now = moment()
    const nextDaily = moment().add(1, 'days').set('hour', 8).set('minute', 0)

    const secondsLeft = nextDaily.diff(now, 'seconds') - now.seconds()

    return {
      hours: Math.floor((secondsLeft % (60 * 60 * 24)) / (60 * 60)),
      minutes: Math.floor((secondsLeft % (60 * 60)) / 60),
      seconds: Math.floor(secondsLeft % 60)
    }
  }

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      const timeLeft = getTimeLeft()
      setCountdown(timeLeft)
    }, 1000)

    return () => {
      clearInterval(countDownInterval)
    }
  }, [])

  if (!countdown) {
    return null
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center my-4"
    >
      <h1 className="text-lg text-zinc-500">Next player in</h1>

      <span className="text-2xl">
        {countdown.hours < 10 && '0'}
        {countdown.hours}:{countdown.minutes < 10 && '0'}
        {countdown.minutes}:{countdown.seconds < 10 && '0'}
        {countdown.seconds}
      </span>
    </motion.div>
  )
}