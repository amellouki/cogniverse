# Validating Dockerfile locally

Build the image locally

```
docker build -t my-app-dev .
```

Run the image locally

```
docker run -p 3000:3000 -p 3001:3001 my-app-dev
```
