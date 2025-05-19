jai shree ram

types of file
1. text file
2. code file -> with compiler
3. canva file -> hand written
4. hybrib -> images, emogis, videos, code file, -> like a blog ->
5. github storage
6. real time collaboration
7. mind map of notes
8. Page Deploying.



#### Steps ...

load markdown from github
Login UI
CodeRunner
Collaborator

image url problem
codeblock run button problem






# Hello I am Akash

#### Steps ...

* [x] Render dummy `file.json` in sidebar

* [x] Option for editing `file.json.`

* [x] Store `file.json ` indexedDB


###### Problems ######

# Rendering file json Sidebar
1. Sending tree json in props recursively and rendering the TreeRender Component.

# updating and Deleting
2. Props transferred and rendered using recursion 
3. for deleting node from its parent => transefered parent to its child in props.

4.  Deleting Props Not chnage the Actual filetree {
    1. Lifted delete fucntion recursively from every tree Render from parent to child 
    till reaching component appsidebar *with updating the node at every render*
    2. Sent functionLifting2 in treenode as prop
        but use onclick deletefile
        and for upadating at every backtrack used functionLifting2
        functionLifting2 calls => functionLifting which comes from props

    3. made usestate of props in every recursive rendered treeRender component
    for showing effect of deleting the file.
}

5. for addnew{
    made a addnewdialog wrapper which call a function addnew came from treeRender as props.
    addnew is handelnew which upadates current nodeand call functionliftiong2 fro upadateing current parent then backtrack
}


6. Always update Filetree in github when chnages in filetree Context
7. Load FileTree from github and also store in indexeddb for more reloads

8. when deleting folder or file from tree render{
    recursively delete all markdowns belonging from that folder using deleteFolder() in TreeRender 
}

# Running Code
1. Running in docker
2. Run button using getElementsByClassName and querySelector;

