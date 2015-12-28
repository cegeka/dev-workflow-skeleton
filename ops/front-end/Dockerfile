FROM nginx:1.9.9

RUN apt-get update 
RUN apt-get install -y dnsmasq 
RUN echo "" >> /etc/dnsmasq.conf 
RUN echo "user=root" >> /etc/dnsmasq.conf 
RUN echo "address=/dev/127.0.0.1" >> /etc/dnsmasq.conf 
RUN cat /etc/dnsmasq.conf
RUN service dnsmasq restart

RUN rm /etc/nginx/conf.d/default.conf

COPY dws-dist/ /data/dws/
COPY dws.conf /etc/nginx/conf.d/