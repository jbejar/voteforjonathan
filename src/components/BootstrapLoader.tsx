'use client'
import { useEffect } from 'react'

export default function BootstrapLoader() {
  useEffect(() => {
    // Only load Bootstrap Icons CSS dynamically
    const bootstrapIconsLink = document.createElement('link')
    bootstrapIconsLink.rel = 'stylesheet'
    bootstrapIconsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'
    document.head.appendChild(bootstrapIconsLink)
    
    // Log to confirm the CSS was added
    console.log('Bootstrap Icons CSS loaded dynamically')
  }, [])
  
  return null
}
