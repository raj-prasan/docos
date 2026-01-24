"use client"
import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { FileIcon, FileJsonIcon, FileTextIcon, GlobeIcon, FilePlusIcon, FilePenIcon, TrashIcon, PrinterIcon, Undo2Icon, Redo2Icon, ScissorsIcon, CopyIcon, Clipboard, TextIcon, BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, RemoveFormattingIcon, AArrowDown } from "lucide-react";
import { BsFile, BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/use-editor-store";


const Navbar = () => {
  const {editor}  = useEditorStore()
const insertTable = ({rows, cols}: {rows: number, cols: number}) =>{
    editor?.chain().focus().insertTable({rows, cols, withHeaderRow: false}).run()
  }
  const onDownload = (blob: Blob,fileName: string) =>{
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.click();
  }
  const onSaveJSON = ()=>{
    if(!editor) return;
    const content = editor.getJSON()
    const blob = new Blob([JSON.stringify(content)],{
      type: "application/json"
    })
    onDownload(blob,`data.json`) //TODO: Use document Name
  }
  const onSaveHTML = ()=>{
    if(!editor) return;
    const content = editor.getText()
    const blob = new Blob([content],{
      type: "text/plain"
    })
    onDownload(blob,`document.txt`) //TODO: Use document Name
  }
  const onSaveTXT = ()=>{
    if(!editor) return;
    const content = editor.getHTML()
    const blob = new Blob([content],{
      type: "text/httml"
    })
    onDownload(blob,`document.html`) //TODO: Use document Name
  }
  return (
    <nav className="flex items-center justify-between ">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image
            src="/docos-custom-logo.svg"
            alt="logo"
            width={110}
            height={50}
          />
        </Link>
        <div className="flex flex-col">
          <DocumentInput />
          <div className="flex ">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden ">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-2" />
                      Save
                      <MenubarSubContent>
                        <MenubarItem onClick={() => onSaveJSON()}>
                          <FileJsonIcon className="size-4 mr-2" />
                          JSON
                        </MenubarItem>
                        <MenubarItem  onClick={() => onSaveHTML()}>
                          <GlobeIcon className="size-4 mr-2" />
                          HTML
                        </MenubarItem>
                        <MenubarItem onClick={()=> window.print()}>
                          <BsFilePdf className="size-4 mr-2" />
                          PDF
                        </MenubarItem>
                        <MenubarItem  onClick={() => onSaveTXT()}>
                          <FileTextIcon className="size-4 mr-2" />
                          TXT
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSubTrigger>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlusIcon className="size-4 mr-2"/>
                    New Document
                  </MenubarItem>
                  <MenubarSeparator/>
                  <MenubarItem>
                    <FilePenIcon className="size-4 mr-2"/>
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon className="size-4 mr-2"/>
                    Remove
                  </MenubarItem>
                  <MenubarSeparator/>
                  <MenubarItem onClick={()=>window.print()}>
                    <PrinterIcon className="size-4 mr-2"/>
                    Print <MenubarShortcut>
                    Ctrl + P
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                    <Undo2Icon className="size-4 mr-2"/>
                    Undo
                  </MenubarItem>
                  <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                    <Redo2Icon className="size-4 mr-2"/>
                    Redo
                  </MenubarItem>
                  <MenubarSeparator/>
                  <MenubarItem>
                    <ScissorsIcon className="size-4 mr-2"/>
                    Cut
                  </MenubarItem>
                  <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                    <CopyIcon className="size-4 mr-2"/>
                    Copy
                  </MenubarItem>
                  <MenubarItem>
                    <Clipboard className="size-4 mr-2"/>
                    Paste
                  </MenubarItem>

                </MenubarContent>

              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => insertTable({rows:1, cols: 1})}>
                        1 x 1
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable({rows:2, cols: 2})}>
                        2 x 2
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable({rows:3, cols: 3})}>
                        3 x 3
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable({rows:4, cols: 4})}>
                        4 x 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className ="size-4 mr-2"/>
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                        <BoldIcon className ="size-4 mr-2"/>
                      Bold
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                        <ItalicIcon className ="size-4 mr-2"/>
                      Italic
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                        <UnderlineIcon className ="size-4 mr-2"/>
                      Underline
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                        <StrikethroughIcon className ="size-4 mr-2"/>
                      Strike
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={() =>editor?.chain().focus().unsetAllMarks().run()}>
                    <RemoveFormattingIcon className="size-4 mr-2"/>
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
