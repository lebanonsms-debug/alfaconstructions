// ---- Storage hook ----

import { useCallback } from 'react'
import { supabase } from '@/lib/supabase'

export function useStorage() {
  const uploadFile = useCallback(
    async (path: string, file: File): Promise<string> => {
      const ext = file.name.split('.').pop()
      const fileName = `${path}/${Date.now()}.${ext}`
      const filePath = `${fileName}`

      const fileExt = file.name.split('.').pop()
      const mimeType = `image/${fileExt || 'png'}`

      const { error } = await supabase.storage
        .from('alfaconstructions-uploads')
        .upload(filePath, file, {
          contentType: mimeType,
          cacheControl: '3600',
          upsert: false,
        })

      if (error) {
        throw error
      }

      return fileName
    },
    []
  )

  const getPublicUrl = useCallback(
    (path: string): string => {
      if (import.meta.env.DEV) {
        return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/alfaconstructions-public/${path}`
      }
      return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/alfaconstructions-public/${path}`
    },
    []
  )

  return { uploadFile, getPublicUrl }
}
