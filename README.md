# PokeView - Vite

My new PokeView Update using Vue3 + Vite for Jublia Front-End Testing
All the SASS in Vue file is created manually.

This Project using plugins
- vue-router
- vuex
- axios
- vite
- sass
- vue-feather-icon

And consume API from pokeapi.co


## Project Setup

If you want run and build this app in your local env then follow bellow instruction.

- Make sure you already installed Node JS in your local ENV (if not, then goto https://nodejs.org/en and follow the install instruction)
- open Terminal / CMD / Bash in this folder
- type ```npm install``` and hit enter
- wait untill all the depedencies is installed
- rename ```.env.EXAMPLE``` into ```.env``` and fill the variable value in there

### Compile and Hot-Reload for Development

Make sure you already install all the depedencies this app need (follow Project Setup instruction above if not)

- open Terminal / CMD / Bash in this folder
- type ```npm run dev``` and hit enter.

There will be a message telling that development server is successfully running
copy the server address from the terminal (e.g ```http://localhost:5173``` ) and paste into your web browser
you successfully access this app in Dev Mode

### Compile and Minify for Production

For building this application for production ready, then follow this step bellow (Make sure you already install all the depedencies this app need)

- open Terminal / CMD / Bash in this folder
- type ```npm run build``` and hit enter

There will be a new folder named ```dist``` inside this project.
You can copy that folder and put into your web server of choice.

### Production Server NOTE

This app is single page app, but it route following the multiple page app route ```e.g http://website.site/user/id```, so to make this route working you need configure the server first or the route will be returning 404 error code.

Here the configuration for your server.

#### Apache Web Server

Create new file named ```.htaccess``` inside this app and write this code bellow (make sure you already enable ```mod_rewrite``` in your apache server)

```sh
<IfModule mod_negotiation.c>
  Options -MultiViews
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx

For nginx you need add this code into your server config that handle this app

```sh
location / {
  try_files $uri $uri/ /index.html;
}
```
