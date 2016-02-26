FROM dws/gradle

RUN apt-get update && \
	apt-get install -y bzip2 make g++ && \
	git config --global url."https://".insteadOf git://

ENTRYPOINT ["cat"]