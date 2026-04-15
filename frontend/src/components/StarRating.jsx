import { useState } from 'react'

// interactive=true → clickable stars for submitting
// interactive=false → display-only stars
const StarRating = ({ value = 0, onChange, interactive = false, size = '1.3rem' }) => {
    const [hovered, setHovered] = useState(0)
    const display = interactive ? (hovered || value) : value

    return (
        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map(star => (
                <span
                    key={star}
                    onClick={() => interactive && onChange?.(star)}
                    onMouseEnter={() => interactive && setHovered(star)}
                    onMouseLeave={() => interactive && setHovered(0)}
                    style={{
                        fontSize: size,
                        color: star <= display ? '#f59e0b' : '#d1d5db',
                        cursor: interactive ? 'pointer' : 'default',
                        transition: 'color 0.15s, transform 0.15s',
                        transform: interactive && star <= (hovered || value) ? 'scale(1.2)' : 'scale(1)',
                        display: 'inline-block',
                        lineHeight: 1
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    )
}

export default StarRating
