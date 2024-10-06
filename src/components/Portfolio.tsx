'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Facebook, Instagram, Sun, Moon, Mail } from 'lucide-react'

interface Image {
  src: string;
  alt: string;
}

interface Section {
  name: string;
  images: Image[];
}

const petImages: Image[] = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/simba2-DbywftoLV0kXVuJPaJal5Ar7LMJ3WT.webp", alt: "Border Collie sitting in grass" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/simba-yHorDKoCzayUoFBVNpezu6TfOYpKU5.webp", alt: "Border Collie running through grass" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mac2-go3WQ3vVgCTu2nwiAe4u9M55M9Aqit.webp", alt: "Border Collie puppy on wooden log" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dog-AFagczRL9Vw9iQCfA2PvGjHkOZynGz.webp", alt: "Staffordshire Bull Terrier portrait" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mac-j10Funv5OsgfIITNvm5eDpKKjbhLQu.webp", alt: "Border Collie puppy running" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cat-HLso4wQrWzFYm9fkwSnPRgZ8QehGjl.webp", alt: "Ginger cat sitting on metal roof" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/deer-0PK6zMroEdJeJ3e75lwDPGfG5deZB6.webp", alt: "Close-up of deer's face" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bruno2-qBlAtb9tQXQE3JQUDkhJ6Z6n1bGJ9B.webp", alt: "Golden Retriever lying on pavement" },
]

const travelImages: Image[] = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hawaii-k99Fg6SEFmwH65v0lsaHkwHfHqBUpk.webp", alt: "Silhouette of people watching sunset in Hawaii" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dorset-xkzpzNm9jXr5lBXIOTLMdRQVDfPkcU.webp", alt: "Coastal cliffs in Dorset, UK" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kyoto-ysFLBG9ld5aljWPj1IcKOfGrwgmv7y.webp", alt: "Golden Pavilion in Kyoto, Japan" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beach-0n4C5s1BnHLJVuoW3E7EYGQQZAbRDj.webp", alt: "Beach chairs and umbrella facing the ocean" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brussels-O4vspqUOToRX22xUGS293HJKJVCMPm.webp", alt: "Atomium in Brussels, Belgium at night" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/osaka-iVelDoREGoE9UO8ermi79oQjKg98wS.webp", alt: "Dotonbori Canal in Osaka, Japan at night" },
]

const portraitImages: Image[] = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bones3-E01DDlWAwG2h3lYZmzuqwhZLgnMy3W.webp", alt: "Young boy in pink checkered shirt looking up and smiling" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bones-x1YchseSoARoyJisVkyvMtPyu95yiP.webp", alt: "Mother hugging two boys, all laughing" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bones2-kiEzltEZpMXbVxYNLWRDQw8kpTW3K0.webp", alt: "Family portrait with parents and two boys lying on grass" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bones4-0rOSYMjBTZ3orsrzkKzd0P9NcZgw3n.webp", alt: "Boy in checkered shirt throwing or catching a pinecone" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bones5-ShK0x1R7NUvFjPRxdeUpcdUQwIpEaa.webp", alt: "Boy blowing bubbles with a bubble wand" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/daisy2-T4r2LXppr4wPWI17rQixXExv4Aua0P.webp", alt: "Young girl in floral dress smiling with adults in background" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/daisy3-8Z6keBnOD03p7Byz6aFtSQPwwhF9hd.webp", alt: "Girl at beach holding stick to ear with woman behind her" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/daisy1-WRQ6U1MLTWRUQIlpALtMcDSpHGz6ol.webp", alt: "Close-up of girl with blue eyes looking off-camera" },
]

const sections: Section[] = [
  { name: 'Pets', images: petImages },
  { name: 'Travel', images: travelImages },
  { name: 'Portraits', images: portraitImages },
]

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [showSwipePrompt, setShowSwipePrompt] = useState(true)
  const [direction, setDirection] = useState(0)
  const [isLongPressing, setIsLongPressing] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const controls = useAnimation()
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const clickTimer = useRef<NodeJS.Timeout | null>(null)
  const [touchStartX, setTouchStartX] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768) // Adjust this breakpoint as needed
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const openFullscreen = (image: Image) => {
    setSelectedImage(image)
  }

  const closeFullscreen = () => {
    setSelectedImage(null)
  }

  const handleDragEnd = (_event: never, info: { offset: { x: number } }) => {
    const threshold = 50
    if (info.offset.x > threshold && activeSection > 0) {
      setActiveSection(activeSection - 1)
      setDirection(-1)
    } else if (info.offset.x < -threshold && activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1)
      setDirection(1)
    } else {
      setDirection(0)
    }
    void controls.start({ x: 0 })
    setShowSwipePrompt(false)
  }

  const handleTouchStart = (event: React.TouchEvent, image: Image) => {
    setTouchStartX(event.touches[0].clientX)
    longPressTimer.current = setTimeout(() => {
      setIsLongPressing(true)
    }, 250)

    clickTimer.current = setTimeout(() => {
      if (!isLongPressing) {
        openFullscreen(image)
      }
    }, 250)
  }

  const handleTouchMove = (event: React.TouchEvent) => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
    if (clickTimer.current) clearTimeout(clickTimer.current)
  }

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touchEndX = event.changedTouches[0].clientX
    const diffX = touchEndX - touchStartX

    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && activeSection > 0) {
        setActiveSection(activeSection - 1)
        setDirection(-1)
      } else if (diffX < 0 && activeSection < sections.length - 1) {
        setActiveSection(activeSection + 1)
        setDirection(1)
      }
      setShowSwipePrompt(false)
    }

    if (longPressTimer.current) clearTimeout(longPressTimer.current)
    if (clickTimer.current) clearTimeout(clickTimer.current)
    setIsLongPressing(false)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && activeSection > 0) {
        setActiveSection(activeSection - 1)
        setDirection(-1)
      } else if (e.key === 'ArrowRight' && activeSection < sections.length - 1) {
        setActiveSection(activeSection + 1)
        setDirection(1)
      }
      setShowSwipePrompt(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    const timer = setTimeout(() => {
      setShowSwipePrompt(false)
    }, 5000)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [activeSection])

  const handleImageClick = (image: Image) => {
    if (isMobile) {
      openFullscreen(image)
    }
  }

  return (
    <div className={`min-h-screen overflow-hidden ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <motion.div
        className="fixed top-0 left-0 right-0 z-10"
        onHoverStart={() => setShowHeader(true)}
        onHoverEnd={() => setShowHeader(false)}
      >
        <motion.header
          className={`${isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-50'} backdrop-blur-md`}
          initial={{ y: -100 }}
          animate={{ y: showHeader ? 0 : -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center py-4 px-6">
            <h1 className="text-2xl font-bold">Aaron Tan Photography</h1>
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold">{sections[activeSection].name}</h2>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-900'}`}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>
          </div>
        </motion.header>
      </motion.div>

      <motion.div
        className="min-h-screen"
        animate={{ y: showHeader ? 100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="min-h-screen px-4"
          drag={isMobile ? false : "x"}
          dragElastic={1}
          onDragEnd={isMobile ? undefined : handleDragEnd}
          animate={controls}
          dragConstraints={{ left: 0, right: 0 }}
          onTouchStart={isMobile ? (e) => setTouchStartX(e.touches[0].clientX) : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeSection}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 px-4 overflow-y-auto scrollbar-hide"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {sections[activeSection].images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`aspect-square overflow-hidden rounded-lg ${isMobile ? 'cursor-pointer' : ''}`}
                    onTouchStart={(e) => handleTouchStart(e, image)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      draggable="false"
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 ${isDarkMode ? 'bg-black bg-opacity-90' : 'bg-white bg-opacity-90'} flex items-center justify-center z-50`}
            onClick={closeFullscreen}
          >
            <button
              className={`absolute top-4 right-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              onClick={closeFullscreen}
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain"
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-0 left-0 right-0 z-10"
        onHoverStart={() => setShowFooter(true)}
        onHoverEnd={() => setShowFooter(false)}
      >
        <motion.footer
          className={`${isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-50'} backdrop-blur-md py-4`}
          initial={{ y: 100 }}
          animate={{ y: showFooter ? 0 : 100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}>
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}>
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="mailto:info@aarontan.co.nz" className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}>
                <Mail size={24} />
                <span className="sr-only">Email</span>
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>info@aarontan.co.nz</p>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>All images and content © 2024 Aaron Tan</p>
          </div>
        </motion.footer>
      </motion.div>

      <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-white' : 'text-gray-900'} opacity-50 pointer-events-none`}>
        <ChevronLeft size={24} />
      </div>
      <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-white' : 'text-gray-900'} opacity-50 pointer-events-none`}>
        <ChevronRight size={24} />
      </div>

      <AnimatePresence>
        {showSwipePrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
            className={`fixed bottom-16 left-0 right-0 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold pointer-events-none`}
          >
            Swipe left or right
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}