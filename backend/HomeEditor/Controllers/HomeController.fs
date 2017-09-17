namespace HomeEditor.Controllers

open System
open System.Collections.Generic
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore.Mvc
open System.IO
open System.Collections.Generic
open System.Linq

type StructureRequest = {
    Path: string
}

type NewFileRequest = {
    Path: string
    Name: string
}

type RenameRequest = {
    OriginalPath: string
    NewPath: string
}

type DeleteRequest = {
    Path: string
}

type SaveRequest = {
    Path: string
    Content: string
}

type FileContentRequest = {
    Path: string
}

type FileContentResult = {
    Success: bool
    Value: string
}

type Result = { 
    Success: bool
    Message: string
}

type File() = 
    member val Name = "" with set,get
    member val FullName = "" with set,get
    member val Location = "" with set,get
    member val Mode = "" with set,get

type Folder() = 
    member val Name = "" with set,get
    member val FullName = "" with set,get
    member val Location = "" with set,get
    member val Folders = Enumerable.Empty<Folder>() with set,get
    member val Files = Enumerable.Empty<File>()  with set,get

type HomeController () =
    inherit Controller()

    let notMatchDir(info: DirectoryInfo) = 
        let names = [
            ".git"
            "node_modules"
            "bin"
            "obj"
        ]
        names.All <| Func<_,_>(info.Name.Contains >> not)

    let matchFileName (info: FileInfo) = 
        let format = [
            ".json"
            ".js"
            ".html"
            ".ts"
            ".md"
            ".tsx"
            ".cs"
            ".fs"
            ".fsproj"
            ".css"
        ]
        format.Any <| Func<_,_>(info.Name.EndsWith)

    let findMode (name: String) = 
        match Path.GetExtension name with
        | ".js" | ".jsx" -> "javascript"
        | ".md" -> "markdown"
        | ".css" -> "css"
        | ".json" -> "json"
        | ".html" -> "html"
        | ".ts" | ".tsx" -> "typescript"
        | _ -> "markdown"
    
    let rec query (str: Folder) path = 
        let dir = DirectoryInfo path
        let dirs = 
            dir.GetDirectories() 
            |> Array.filter(notMatchDir)

        let files  = 
            dir.GetFiles()
            |> Array.filter(matchFileName)

        str.Folders <- 
            [ for item in dirs do
                yield query (Folder()) item.FullName ]
            |> List.filter(fun x -> x.Files.Count() > 0 || x.Folders.Count() > 0)

        str.Name <- dir.Name
        str.FullName <- dir.FullName
        str.Location <- dir.Parent.FullName
        str.Files <- 
            files.Select(fun x -> 
                File(
                     Name = x.Name, 
                     FullName = x.FullName, 
                     Mode = findMode x.Name,
                     Location = x.DirectoryName)).ToList()
        (str)

    [<HttpPost>]
    member this.GetStructures([<FromBody>] req: StructureRequest) = 
        if req.Path = "/" then
            Folder(Name="<Root>")
        elif Directory.Exists req.Path then
            let str = Folder()
            query str req.Path
        else
            Folder(Name="<Empty>")

    [<HttpPost>]
    member this.CreateNewFile([<FromBody>] req: NewFileRequest) = 
        let dir = req.Path
        if Directory.Exists dir then
            let full = Path.Combine(dir, req.Name)
            if File.Exists full |> not then
                File.WriteAllText(full, "")
                { Success = true; Message = "" }
            else
                { Success = false; Message = "File already exist"}
        else
            { Success = false; Message = "Directory is not exist" }

    [<HttpPost>]
    member this.CreateNewFolder([<FromBody>] req: NewFileRequest) = 
        let dir = req.Path 
        if Directory.Exists dir then
            let full = Path.Combine(dir, req.Name)
            if Directory.Exists full |> not then
                Directory.CreateDirectory full |> ignore
                { Success = true; Message = "" }
            else
                { Success = false; Message = "Directory already exist" }
        else
            { Success = false; Message = "Directory is not exist" }


    [<HttpPost>]
    member this.RenameFile([<FromBody>] req: RenameRequest) = 
        let src = File.Exists req.OriginalPath
        let des = File.Exists req.NewPath
        
        if src && (des |> not) then
            File.Move(req.OriginalPath, req.NewPath)
            { Success = true; Message = "" }
        else
            { Success = false; Message = "" }

    [<HttpPost>]
    member this.DeleteFile([<FromBody>] req: DeleteRequest) = 
        let path = req.Path
        let exist = File.Exists path 
        if exist then
            File.Delete path
            { Success = true; Message = "" }
        else
            { Success = false; Message = "" }

    [<HttpPost>]
    member this.SaveFileContent([<FromBody>] req: SaveRequest) = 
        let path = req.Path 
        let exist = File.Exists path
        if exist then
            File.WriteAllText(path, req.Content)
            { Success = true; Message = "File not exist" }
        else
            { Success = false; Message = "" }

    [<HttpPost>]
    member this.GetFileContent([<FromBody>] req: FileContentRequest) = 
        let path = req.Path
        let exist = File.Exists path
        if exist then
            let text = File.ReadAllText path
            { Success = true; Value = text }
        else
            { Success = false; Value = "" }