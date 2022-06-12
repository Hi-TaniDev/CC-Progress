# HiTani API

This is a simple API created to fullfill the HiTani application needs.

## Instalation

- Clone this repository into your local machine.
- Create your own MongoDB database through MongoDB atlas.
- Insert the URL of your MongoDB database to the dbUrl parameter inside **db.config.js**
  `const dbUrl = "<Your MongoDB link>"`
- Test the code locally.  If it was a success, then copy the files into your own repository.
- Open Google Cloud Platform.
- Create your own Compute Engine VM.
- Connect with SSH into your Compute Engine VM.
- Install **nodejs** and **npm** inside your VM. Run : 
  `sudo apt-get update && apt-get install nodejs npm -y`
- Clone your own repo into your VM.
- Run : `npm init`
- Install nginx, Run : `sudo apt-get install nginx -y`
- Open directory **/etc/nginx/sites-available** inside your VM.
- Change your *default* file content with :
    ```
    server {
        listen 80;
        server_name YOUR_VM_EXTERNAL_IP_ADDRESS;

        location / {
            proxy_pass "http://127.0.0.1:8080";
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_cache_bypass $http_upgrade;
        }
    }
  ```
- Run : `sudo service nginx restart`
- Go to your git code repository inside your VM
- Run : `sudo npm install -g pm2`
- Then run your server : `pm2 start server.js`