import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Helmet } from 'vtex.render-runtime'

interface Props {
  mobile: string
  desktop: string
  link: string
  alt: string
  videoMobile: string
  videoDesktop: string
  loading: 'lazy' | 'eager'
  preload: boolean
}
export const HANDLES = [
  'imageWrapper',
  'picture',
  'image',
  'videoWrapper',
  'video',
] as const

export const Image = ({
  mobile,
  desktop,
  link,
  alt,
  videoMobile,
  videoDesktop,
  loading,
  preload,
}: Props) => {
  const { handles } = useCssHandles(HANDLES)
  const { isMobile } = useDevice()

  if (videoMobile && isMobile) {
    return (
      <a href={link} className={handles.videoWrapper}>
        <iframe
          src={`https://player.vimeo.com/video/${videoMobile}?title=0&muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen={true}
          title={alt}
          allowTransparency={true}
          data-ready="true"
          className={handles.video}
        ></iframe>
      </a>
    )
  }

  if (videoDesktop && !isMobile) {
    return (
      <a href={link} className={handles.videoWrapper}>
        <iframe
          src={`https://player.vimeo.com/video/${videoDesktop}?title=0&muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen={true}
          title={alt}
          allowTransparency={true}
          data-ready="true"
          className={handles.video}
        ></iframe>
      </a>
    )
  }

  return (
    <>
      {preload ? (
        <Helmet>
          <link rel="preload" as="image" href={!isMobile ? desktop : mobile} />
        </Helmet>
      ) : (
        ''
      )}
      <a href={link} className={handles.imageWrapper}>
        <picture className={handles.picture}>
          <source srcSet={desktop} media="(min-width: 768px)" />
          <img
            src={mobile}
            alt={alt}
            className={handles.image}
            loading={loading}
          />
        </picture>
      </a>
    </>
  )
}

Image.schema = {
  title: 'Imagem',
}
