import { Button } from "@/components/ui"
import { UI } from "@/lib/constants/ui.constants"
import { DownloadIcon } from "lucide-react"

interface CvDownloadButtonProps {
  label: string
}

// The primary action of the site: /cv.pdf is served as an attachment
export function CvDownloadButton({ label }: CvDownloadButtonProps) {
  return (
    <Button render={<a href={UI.ROUTES.CV} download />} nativeButton={false}>
      <DownloadIcon data-icon="inline-start" />
      {label}
    </Button>
  )
}
