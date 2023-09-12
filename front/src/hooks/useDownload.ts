const useDownload = (file: string): {
  onDownload: (name: string | undefined, format: string) => void
} => {
  const onDownload = (name: string = 'File', extension: string = 'txt'): void => {
    const url = window.URL.createObjectURL(
      new Blob([file])
    )

    const link = document.createElement('a')

    link.href = url
    link.setAttribute('download', `${name}.${extension}`)

    document.body.appendChild(link)

    link.click()

    if (link.parentNode == null) {
      throw new Error('Link not defined')
    }

    link.parentNode.removeChild(link)
  }

  return {
    onDownload
  }
}

export default useDownload
