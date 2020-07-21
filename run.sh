
#dev docker
docker run -it -v /home/cnwzhu/nginx.conf:/etc/nginx/nginx.conf -v /home/cnwzhu/dist:/web --net=host nginx

#prod docker
docker run -d -v /root/srs-build/nginx.conf:/etc/nginx/nginx.conf -v /root/srs-build/web:/web --net=host nginx
