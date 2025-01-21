FROM node:18
WORKDIR /Cine-front
COPY package.json package-lock.json ./
COPY . . 
EXPOSE 3000
CMD ["node", "cine_web_app/front-end/js/server.js"]