"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface RemoveDialogProps {
  documentId: Id<"documents">;
  title: string;
  children: React.ReactNode;
}

const RenameDialog = ({ documentId, title, children }: RemoveDialogProps) => {
  const update = useMutation(api.documents.updateById);
  const [isRenaming, setIsRenaming] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={e => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Enter a new name for the document
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" type="button" onClick={()=>setOpen(false)}>Cancel</Button>
            <Button
              type="submit"
              onClick={(e) => {
                setIsRenaming(true);
                update({ id: documentId, title: inputValue });
                setOpen(false);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
