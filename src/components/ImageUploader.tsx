"use client"

import React, { useState, useRef, useEffect } from 'react'
import { UploadCloud, X, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { deleteImageByUrl } from '@/lib/supabase/storage'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  className?: string
}

export function ImageUploader({ value, onChange, className = '' }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  useEffect(() => {
    setPreview(value || null)
  }, [value])

  const handleFile = async (file: File) => {
    if (isUploading) return
    setErrorMessage(null)
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Formato não suportado. Use JPG, PNG ou WEBP.")
      return
    }
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setErrorMessage("Arquivo maior que 5MB.")
      return
    }

    setIsUploading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setErrorMessage("Você precisa estar autenticado para enviar imagens.")
        setIsUploading(false)
        return
      }

      const ext = file.name.split('.').pop()
      const fileName = crypto.randomUUID()
      const path = `${user.id}/${fileName}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(path, file, { cacheControl: '3600', upsert: false })

      if (uploadError) {
        setErrorMessage(uploadError.message || "Falha ao enviar imagem.")
        setIsUploading(false)
        return
      }

      const { data } = supabase.storage.from('project-images').getPublicUrl(path)
      
      if (value) {
        await deleteImageByUrl(value)
      }

      setPreview(data.publicUrl)
      onChange(data.publicUrl)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message)
      } else {
        setErrorMessage("Falha ao enviar imagem.")
      }
    } finally {
      setIsUploading(false)
    }
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (isUploading) return
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
      e.dataTransfer.clearData()
    }
  }

  const handleClick = () => {
    if (isUploading) return
    fileInputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isUploading) return
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isUploading) return
    
    setIsUploading(true)
    setErrorMessage(null)
    try {
      if (value) {
        await deleteImageByUrl(value)
      }
      setPreview(null)
      onChange('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      setErrorMessage("Falha ao remover imagem.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {preview ? (
        <div className={`relative w-full aspect-video rounded-lg overflow-hidden border border-slate-800 bg-slate-900 group ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}>
          <Image 
            src={preview} 
            alt="Preview" 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={handleRemove}
            disabled={isUploading}
            className={`absolute top-2 right-2 transition-opacity h-8 w-8 rounded-full z-20 ${isUploading ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'}`}
            title="Remover imagem"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDrop={onDrop}
          onClick={handleClick}
          className={`w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors ${
            isUploading 
              ? 'opacity-50 cursor-not-allowed border-slate-800 bg-slate-900/50' 
              : errorMessage 
                ? 'border-red-500/50 hover:border-red-500 cursor-pointer' 
                : 'border-slate-800 hover:border-slate-600 bg-slate-950/50 hover:bg-slate-900/50 cursor-pointer'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleInputChange}
            disabled={isUploading}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />
          {isUploading ? (
            <div className="flex flex-col items-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <span className="text-sm">Enviando imagem...</span>
            </div>
          ) : (
            <>
              <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
              <p className="text-sm text-slate-300 font-medium">
                Clique ou arraste uma imagem
              </p>
              <p className="text-xs text-slate-500 mt-1">
                JPG, PNG, WEBP — máx. 5MB
              </p>
            </>
          )}
        </div>
      )}
      {errorMessage && (
        <p className="text-sm text-red-500 mt-2 font-medium">{errorMessage}</p>
      )}
    </div>
  )
}
