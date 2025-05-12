// components/AlertDialogWrapper.tsx
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface AlertDialogWrapperProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onResolve: (confirmed: boolean) => void;  // instead of isContinue
  title?: string;
  description?: string;
}

export default function AlertDialogWrapper({
  open,
  setOpen,
  onResolve,
  title = "Are you sure?",
  description = "This action cannot be undone.",
}: AlertDialogWrapperProps) {


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false);      
              onResolve(false);   
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setOpen(false);      
              onResolve(true);    
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  );
}
