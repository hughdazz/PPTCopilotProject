# 基础镜像
FROM node:16

# 项目目录
WORKDIR /app

# 复制项目文件
COPY . .

# 安装项目依赖
RUN npm install

# 设置时区
ENV TZ=Asia/Shanghai
RUN apt-get update && apt-get install -y tzdata && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && apt-get install -y --reinstall ca-certificates

# 暴露端口
EXPOSE 9529

# 启动命令
CMD ["npm", "run", "dev", "--", "--port", "9529"]
