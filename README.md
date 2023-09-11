## Install and run

Add .env file for environment variables, not in the image:

```bash
echo "
EMAIL="email@example.com"
GMAIL_PASSWORD="example1234"
USERNAME="production_admin"
PASSWORD="production1234"
" >> .env
```

Build the image:

```bash
docker build -t [username]/email-api .
```

Run the container:

```bash
docker run -d -it --rm -p [HOST_IP]:5000 --name [container-name] [username]/email-api
```
