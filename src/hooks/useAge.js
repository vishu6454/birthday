import { useEffect, useState } from 'react'

export function useAge(dobISO) {
  const [age, setAge] = useState(0)

  useEffect(() => {
    const calc = () => {
      const dob = new Date(dobISO)
      const now = new Date()
      let years = now.getFullYear() - dob.getFullYear()
      const m = now.getMonth() - dob.getMonth()
      if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) years--
      setAge(years)
    }
    calc()
    const t = setInterval(calc, 60000)
    return () => clearInterval(t)
  }, [dobISO])

  return age
}