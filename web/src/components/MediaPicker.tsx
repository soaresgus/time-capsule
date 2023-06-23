'use client'

import Image from 'next/image'
import { ChangeEvent, InputHTMLAttributes, useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface IMediaPickerProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function MediaPicker(props: IMediaPickerProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const { register } = useFormContext()

  const onFileSelected = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }, [])

  return (
    <>
      <input
        id={props.name}
        type="file"
        className="invisible h-0 w-0"
        onChangeCapture={onFileSelected}
        accept="image/*"
        {...register(props.name)}
        {...props}
      />

      {preview && (
        <Image
          src={preview}
          alt=""
          className="!relative aspect-video !h-auto w-full rounded-lg object-cover"
          fill
        />
      )}
    </>
  )
}
