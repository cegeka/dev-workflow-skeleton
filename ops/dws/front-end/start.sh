(echo "upstream dws-back-end { server $dws_api_proxy:8080; } " && cat /etc/nginx/conf.d/dws.conf) > /tmp/dws.conf
mv /tmp/dws.conf /etc/nginx/conf.d/dws.conf
nginx -g "daemon off;"