import JoditEditor from 'jodit-react'
import { useRef } from 'react'

const RichTextEditor = ({ setValue, value }) => {
  const editor = useRef(null)

  return (
    <JoditEditor
      ref={editor}
      onChange={(value) => setValue(value)}
      value={value}
    />
  )
}

export default RichTextEditor
