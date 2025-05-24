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
import { Label } from "@/components/ui/label"
import { useState } from "react"
// import { joinCollab } from "@/lib/socket"
import { useRouter } from "next/navigation"


export function CollabDialog() {
    // const router = useRouter()
    function generateRandomString(length = 12) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const [collabLink, setCollabLink] = useState<string>("")

    function GenerateCollabLink() {
        let url = "http://localhost:3000/collab/"
        let link = generateRandomString();
        setCollabLink(url + link)
    }

    const copyToClipboard = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(collabLink);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    

    async function handleCollab() {
        // await joinCollab({link:collabLink});
         window.open(collabLink, '_blank', 'noopener,noreferrer');
        // router.push(collabLink);
    }



    return (
        <Dialog>
            <DialogTrigger onClick={GenerateCollabLink} asChild>
                <Button variant="outline">Collaborate</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to edit this file.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={collabLink!}
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3 hover:bg-gray-300 active:bg-gray-500 " onClick={copyToClipboard} >
                        <span className="sr-only">Copy</span>
                        <Copy />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={handleCollab}>
                            Create Link
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
