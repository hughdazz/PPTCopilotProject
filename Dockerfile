FROM node:16

WORKDIR /home/app

COPY . . 

# 如果ARG MODE="dev"，则运行env.py dev否则运行env.py prod
ARG MODE
RUN python3 env.py $MODE

RUN npm config set registry https://registry.npmmirror.com/ && npm install --legacy-peer-deps

EXPOSE 9529

CMD ["npm", "run", "dev", "--", "--port", "9529"]
