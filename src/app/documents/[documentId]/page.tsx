import {Editor} from "./editor"

interface DocumentIdPageProps {
  params: Promise<{documentId: string}>
}

const DocumentIdPage = async ({params}: DocumentIdPageProps) => {
  const documentId =  (await params).documentId
  return ( 
  <div className="min-h-screen bg-[#FAFBFD]">
    
    <Editor></Editor>
  </div> );
}
 
export default DocumentIdPage;