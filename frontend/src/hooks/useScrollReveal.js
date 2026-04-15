import { useEffect, useRef, useState } from 'react'

// Reveals element when it scrolls into view
const useScrollReveal = (threshold = 0.15) => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
            { threshold }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [threshold])

    return { ref, visible }
}

export default useScrollReveal
