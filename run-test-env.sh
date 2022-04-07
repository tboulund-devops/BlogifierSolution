dotnet publish src/Blogifier/Blogifier.csproj -o outputs
docker-compose down
docker-compose up -d --build