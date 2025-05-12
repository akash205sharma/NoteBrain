import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface AddNewDialogWrapperProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  addName:(name:string)=>{};
}

export default function AddNewDialogWrapper({
  open,
  setOpen,
  addName,
}: AddNewDialogWrapperProps) {

  const [name, setName] = useState("")


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New File/Folder </DialogTitle>
          <DialogDescription>
            Enter the name of file to add
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="text"
              placeholder="Enter file name"
              value={name}
              onChange={(e) => { setName(e.target.value)}}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="submit" variant="default" onClick={() => { setOpen(false); addName(name)}}>
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
