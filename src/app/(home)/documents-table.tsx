import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LoaderIcon } from "lucide-react";
import { DocumentRow } from "./doument-row";
import { Button } from "@/components/ui/button";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number)=>void;
  status: PaginationStatus;
  isLoading: boolean
}


const DocumentsTable = ({
  documents,
  loadMore,
  status,
  isLoading
}: DocumentsTableProps) => {
  return ( 
    <div className="max-w-screen mx-auto px-16 py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <div className="flex justify-center items-center h-24">
          <LoaderIcon className="animate-spin text-muted-foreground size-5"/>
        </div>
      ):(
        <div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-none">
                <TableHead>Name</TableHead>
                <TableHead>&nbsp;</TableHead>
                <TableHead className="hidden md:table-cell">Shared</TableHead>
                <TableHead className="hidden md:table-cell">Created At</TableHead>
              </TableRow>
            </TableHeader>
            {documents.length === 0?(
              <TableBody className="hover:bg-transparent">
                <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No Documents Found
                </TableCell>
                </TableRow>
              </TableBody>
            ):(
              <TableBody className="hover:bg-transparent">
                {documents.map(document =>{
                  return (
                    <DocumentRow key={document._id}  document = {document}/>
                  )
                })}
              </TableBody>
            )}
          </Table>
        </div>
      )}
      <div className="flex items-center justify-center">
        <Button variant="ghost" size="sm" onClick={() =>loadMore(5)} disabled = {status !==  "CanLoadMore"}>
          {status === "CanLoadMore" ? "Load More" : "End of results"}
        </Button>
      </div>
    </div>
   );
}
 
export default DocumentsTable;