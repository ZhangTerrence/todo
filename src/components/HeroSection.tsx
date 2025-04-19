import { FaCheckCircle } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'

const HeroSection = () => (
  <section style={{ textAlign: 'center', padding: '2rem' }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
      ✨ Take Control of Your Day with <span style={{ color: '#4F46E5' }}>TodoFlow</span>
    </h1>
    <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
      Streamline tasks. Maximize focus. Crush your goals.
    </p>

    {/* <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
      <li><FaCheckCircle color="#4CAF50" /> &nbsp; Smart reminders and scheduling</li>
      <li><FaCheckCircle color="#4CAF50" /> &nbsp; Easy drag-and-drop task planning</li>
      <li><FaCheckCircle color="#4CAF50" /> &nbsp; Minimal, clutter-free interface</li>
    </ul> */}
    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
  <li>
    <FaCheckCircle color="#4CAF50" style={{ position: 'relative', top: '25px' }} /> &nbsp;
    Smart reminders and scheduling
  </li>
  <li>
    <FaCheckCircle color="#4CAF50" style={{ position: 'relative', top: '25px' }} /> &nbsp;
    Easy drag-and-drop task planning
  </li>
  <li>
    <FaCheckCircle color="#4CAF50" style={{ position: 'relative', top: '25px' }} /> &nbsp;
    Minimal, clutter-free interface
  </li>
</ul>
    <Link href="/register" passHref>
    <button
      style={{
        fontSize: '1rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#4F46E5',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      Get Started <FiArrowRight />
    </button>
    </Link>
  </section>
)

export default HeroSection

