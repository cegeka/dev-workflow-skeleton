FROM java:8u66-jdk

ENV dws.environment default

COPY dws-jar/dws-rest.jar /usr/src/dws-rest.jar
WORKDIR /usr/src/

EXPOSE 8080

ENTRYPOINT ["java", "-jar" , "dws-rest.jar"]