import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'

const FloatingHeart = ({ delay, left, size, duration }: { delay: number; left: number; size: number; duration: number }) => (
  <div
    className={styles.floatingHeart}
    style={{
      left: `${left}%`,
      animationDelay: `${delay}s`,
      fontSize: `${size}px`,
      animationDuration: `${duration}s`,
    }}
  >
    ♥
  </div>
)

const Particle = ({ x, y, color }: { x: number; y: number; color: string }) => {
  const angle = Math.random() * 360
  const distance = 80 + Math.random() * 120
  const dx = Math.cos((angle * Math.PI) / 180) * distance
  const dy = Math.sin((angle * Math.PI) / 180) * distance

  return (
    <div
      className={styles.particle}
      style={{
        left: x,
        top: y,
        backgroundColor: color,
        '--dx': `${dx}px`,
        '--dy': `${dy}px`,
      } as React.CSSProperties}
    />
  )
}

// Safe positions for No button — all in the lower portion of the card,
// far from the Yes button which sits at the top-center of buttonArea
const NO_ZONES = [
  { top: 78, left: 10 },
  { top: 78, left: 68 },
  { top: 88, left: 18 },
  { top: 88, left: 58 },
  { top: 68, left: 8  },
  { top: 68, left: 74 },
  { top: 93, left: 38 },
  { top: 73, left: 44 },
]

const Home: NextPage = () => {
  const [answer, setAnswer] = useState<null | 'yes'>(null)
  const [noCount, setNoCount] = useState(0)
  const [noPosition, setNoPosition] = useState({ top: '78%', left: '68%' })
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([])
  const [hearts, setHearts] = useState<{ id: number; delay: number; left: number; size: number; duration: number }[]>([])
  const [showContent, setShowContent] = useState(false)
  const yesRef = useRef<HTMLButtonElement>(null)
  const lastZoneRef = useRef(1)

  const noMessages = [
    'Nope! Try again 😄',
    'Still no? Really? 🥺',
    'Are you sure...? 💭',
    'Think harder!! 💝',
    'Last chance!! 😤',
    'Come onnnn! 🙏',
    'Pretty please? 🌹',
    'Eva... 🥺👉👈',
    "You can't resist! 💘",
    'Just say YES! 💖',
    'THE BUTTON IS TINY! 😂',
  ]

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      left: Math.random() * 100,
      size: 12 + Math.random() * 20,
      duration: 6 + Math.random() * 6,
    }))
    setHearts(newHearts)
    setTimeout(() => setShowContent(true), 100)
  }, [])

  const pickNewPosition = () => {
    let idx = lastZoneRef.current
    while (idx === lastZoneRef.current) {
      idx = Math.floor(Math.random() * NO_ZONES.length)
    }
    lastZoneRef.current = idx
    const zone = NO_ZONES[idx]
    return { top: `${zone.top}%`, left: `${zone.left}%` }
  }

  const handleNoHover = () => {
    setNoPosition(pickNewPosition())
  }

  const handleNo = () => {
    setNoCount((c) => c + 1)
    setNoPosition(pickNewPosition())
  }

  const handleYes = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const colors = ['#ff6b9d', '#ff8fab', '#ffc2d4', '#ffb347', '#ff4d6d', '#c77dff', '#ff6b6b']
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: cx,
      y: cy,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 1200)
    setAnswer('yes')
  }

  const noButtonScale = Math.max(0.4, 1 - noCount * 0.07)
  const yesButtonScale = Math.min(1.6, 1 + noCount * 0.08)

  return (
    <>
      <Head>
        <title>Eva Will You Be My Valentine?</title>
        <meta name="description" content="A special question for Eva" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.container}>
        {hearts.map((h) => (
          <FloatingHeart key={h.id} delay={h.delay} left={h.left} size={h.size} duration={h.duration} />
        ))}

        {particles.map((p) => (
          <Particle key={p.id} x={p.x} y={p.y} color={p.color} />
        ))}

        {answer === 'yes' ? (
          <div className={`${styles.yesScreen} ${styles.fadeIn}`}>
            <div className={styles.bigHeart}>💝</div>
            <h1 className={styles.yesTitle}>She Said YES! 🎉</h1>
            <p className={styles.yesMessage}>
              Eva, you&apos;ve made me the happiest person in the world.
              <br />
              <span className={styles.italic}>Happy Valentine&apos;s Day, my love. 🌹</span>
            </p>
            <div className={styles.heartRow}>
              {['💖','💕','💗','💓','💞','💘','💝'].map((h, i) => (
                <span key={i} className={styles.celebrationHeart} style={{ animationDelay: `${i * 0.1}s` }}>
                  {h}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className={`${styles.card} ${showContent ? styles.visible : ''}`}>
            <div className={styles.envelope}>💌</div>

            <h1 className={styles.title}>
              Dear <span className={styles.name}>Eva</span>,
            </h1>

            <p className={styles.poem}>
              Every moment with you feels like
              <br />a page from the most beautiful story.
              <br />
              <span className={styles.italic}>
                This Valentine&apos;s Day, I have one
                <br />
                very important question...
              </span>
            </p>

            <h2 className={styles.question}>
              Will you be
              <br />
              my <span className={styles.highlight}>Valentine?</span>
            </h2>

            <div className={styles.buttonArea}>
              <button
                ref={yesRef}
                className={styles.yesBtn}
                onClick={handleYes}
                style={{ transform: `scale(${yesButtonScale})` }}
              >
                Yes! 💖
              </button>

              <button
                className={styles.noBtn}
                onClick={handleNo}
                onMouseEnter={handleNoHover}
                style={{
                  top: noPosition.top,
                  left: noPosition.left,
                  transform: `translate(-50%, -50%) scale(${noButtonScale})`,
                  opacity: Math.max(0.65, noButtonScale),
                }}
              >
                {noCount === 0 ? 'No 😐' : noMessages[Math.min(noCount - 1, noMessages.length - 1)]}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Home
