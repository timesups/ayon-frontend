import { expandableMimeTypes, getFileURL } from '../FileUploadPreview'
import * as Styled from '../FileUploadPreview.styled'

interface ImageMimeProps {
  file: {
    id: string
    projectName: string
    mime: string
  }
}

const ImageMime = ({ file }: ImageMimeProps) => {
  const { id, projectName, mime } = file || {}
  let imgURL = getFileURL(id, projectName)
  const useFullPreview = expandableMimeTypes?.image?.fullPreviews?.some((ext) => mime.includes(ext))
  // if the file is NOT png, jpg, jpeg, gif, or svg, we use preview image
  if (!useFullPreview) imgURL += '/thumbnail'

  return <Styled.Image src={imgURL} autoFocus />
}

export default ImageMime
