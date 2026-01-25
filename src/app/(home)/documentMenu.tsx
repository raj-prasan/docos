import { Button } from "@/components/ui/button";
import { EditIcon, ExternalLinkIcon, MoreVertical, TrashIcon } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import RemoveDialog from "@/components/remove-dialog";
import RenameDialog from "@/components/renameDialog";

interface DocumentMenuProps{
  documentId: Id<"documents">,
  title: string;
  onNewTab :(id: Id<"documents">) => void
}

const DocumentMenu = ({documentId, title, onNewTab}:DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
        <MoreVertical className="size-4" />
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RenameDialog documentId={documentId} title={title}>
          <DropdownMenuItem
          onClick={(e)=> e.stopPropagation()}
          onSelect={(e)=> e.preventDefault()}
          >
            <EditIcon className="size-4 mr-2"/>
            Rename
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
          onClick={(e)=> e.stopPropagation()}
          onSelect={(e)=> e.preventDefault()}
          >
            <TrashIcon className="size-4 mr-2"/>
            Remove
          </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem onClick={()=>onNewTab(documentId)}>
          <ExternalLinkIcon className="size-2 mr-4"/>
          Open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocumentMenu;
