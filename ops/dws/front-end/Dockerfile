FROM nginx:1.9.9

RUN apt-get update && \
		apt-get install -y dnsmasq && \
		sed -i '1i user=root' /etc/dnsmasq.conf && \
		echo "" >> /etc/dnsmasq.conf && \
		echo "listen-address=127.0.0.1" >> /etc/dnsmasq.conf

RUN rm /etc/nginx/conf.d/default.conf
COPY dws-dist/ /data/dws/
COPY dws.conf /etc/nginx/conf.d/

COPY start.sh /usr/bin/start.sh
CMD ["/bin/bash", "/usr/bin/start.sh"]