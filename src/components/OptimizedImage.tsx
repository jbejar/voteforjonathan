'use client'
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className
}: OptimizedImageProps) {
  // Determine if the image is a remote URL or local
  const isRemote = src.startsWith('http')

  // For both remote and local images, use Next.js Image component
  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      unoptimized={isRemote} // Mark remote images as unoptimized for static export
    />
  )
}
