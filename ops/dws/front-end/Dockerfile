FROM nginx:1.9.9

RUN rm /etc/nginx/conf.d/default.conf

COPY dws-dist/ /data/dws/
COPY dws.conf /etc/nginx/conf.d/