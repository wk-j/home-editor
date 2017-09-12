Action<string,string, string> ps = (cmd, args, project) => {
    var fullDir = System.IO.Path.GetDirectoryName(project);
    StartProcess(cmd, new ProcessSettings {
        Arguments = args,
        WorkingDirectory = fullDir
    });
};

Task("Watch-Run").Does(() => {
     ps("dotnet", "watch run", "backend/HomeEditor/HomeEditor.fsproj");
});

var target = Argument("target", "default");
RunTarget(target);