FROM nginx:1.9.9

ENV dws_api_proxy localhost

RUN rm /etc/nginx/conf.d/default.conf
COPY dws-dist/ /data/dws/
COPY dws.conf /etc/nginx/conf.d/

COPY start.sh /usr/bin/start.sh
CMD ["/bin/bash", "/usr/bin/start.sh"]