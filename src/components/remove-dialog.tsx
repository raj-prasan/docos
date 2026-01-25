"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

interface RemoveDialogProps{
  documentId: Id<"documents">;
  children: React.ReactNode

}

const RemoveDialog = ({ documentId, children }:  RemoveDialogProps) => {
  const remove = useMutation(api.documents.removeById)
  const [isRemoving, setIsRemoving] = useState(false)
  return ( 
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent onClick={(e)=> e.stopPropagation()} >
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete the document?</AlertDialogTitle> 
          <AlertDialogDescription>
          This action cannot be undone.This will permanently delete your document.
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction 
        disabled={isRemoving}
        onClick={(e)=>{
          e.stopPropagation();
          setIsRemoving(true);
          remove({id: documentId})
          .finally(()=>setIsRemoving(false))
          }}>
          Delete
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
   );
}
 
export default RemoveDialog;