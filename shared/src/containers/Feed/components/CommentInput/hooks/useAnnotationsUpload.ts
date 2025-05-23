import { uploadFile } from '../helpers'
import { toast } from 'react-toastify'
import { useFeedContext } from '../../../context/FeedContext'

type Props = {
  projectName: string
  onSuccess: (data: any) => void
}

const useAnnotationsUpload = ({ projectName, onSuccess }: Props) => {
  const { removeAnnotation, exportAnnotationComposite } = useFeedContext()

  const uploadAnnotations = async (annotations: any[]) => {
    try {
      const uploadPromises = annotations.map(async (annotation) => {
        const blob = await exportAnnotationComposite(annotation.id)
        if (!blob) {
          throw new Error(`Exporting composite image for annotation ${annotation.id} failed`)
        }

        const file = new File([blob], annotation.name, {
          type: 'image/png',
        })

        return uploadFile(file, projectName, () => {})
      })

      const res = await Promise.allSettled(uploadPromises)

      const successfulFiles: any[] = []
      //   for each result, if successful use callback
      res.forEach((result: any) => {
        if (result.status === 'fulfilled') {
          const newFile = onSuccess(result.value)

          successfulFiles.push(newFile)

          const annotationId = annotations.find(
            (annotation) => annotation.name === result.value.file.name,
          )?.id
          if (annotationId) {
            removeAnnotation(annotationId)
          }
        } else {
          toast.error('Upload failed: ' + result.reason.message)
        }
      })

      return successfulFiles
    } catch (error: any) {
      toast.error('Upload failed: ' + error.message)
      return []
    }
  }

  return uploadAnnotations
}

export default useAnnotationsUpload

const base64ToBlob = (base64: string) => {
  const byteString = atob(base64.split(',')[1])
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: mimeString })
}
