FROM node:latest

WORKDIR /home/app

COPY . .

RUN npm config set registry https://registry.npm.taobao.org && npm install

EXPOSE 9529

CMD ["npm", "run", "dev", "--", "--port", "9529"]
