# 设置基础镜像
FROM nginx
# 定义作者
MAINTAINER zhonghaibin <756152823@qq.com>
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
