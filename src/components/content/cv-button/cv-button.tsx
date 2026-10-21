import { Button } from "@/components/ui"
import { UI } from "@/lib/constants/ui.constants"
import { FileTextIcon } from "lucide-react"

interface CvButtonProps {
  label: string
}

// The primary action of the site: the CV opens as a page, with the PDF one click away
export function CvButton({ label }: CvButtonProps) {
  return (
    <Button render={<a href={UI.ROUTES.CV} />} nativeButton={false}>
      <FileTextIcon data-icon="inline-start" />
      {label}
    </Button>
  )
}
