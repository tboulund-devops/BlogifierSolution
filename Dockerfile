FROM mcr.microsoft.com/dotnet/aspnet:6.0 as run
COPY outputs /opt/blogifier/outputs
WORKDIR /opt/blogifier/outputs
ENTRYPOINT ["dotnet", "Blogifier.dll"]