import Feature from './Feature'
import { FaCheckCircle, FaBell, FaCalendarAlt } from 'react-icons/fa'

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaCheckCircle />,
      title: 'Easy Task Management',
      description: 'Quickly add, edit, and organize your todos.',
    },
    {
      icon: <FaBell />,
      title: 'Reminders',
      description: 'Stay on track with smart notifications.',
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Daily Planning',
      description: 'Plan your day with calendar integration.',
    },
  ]

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      {features.map((feat, i) => (
        <Feature key={i} {...feat} />
      ))}
    </section>
  )
}