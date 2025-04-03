import { Layout } from "@/components/layout"
import { FileUpload } from "@/components/file-upload"

export default function UploadPage() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Subir Archivo</h1>
        <FileUpload />
      </div>
    </Layout>
  )
}

