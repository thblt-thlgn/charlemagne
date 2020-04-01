FROM postgres:12.2-alpine
LABEL maintainer="thibault@nobbas.com"
LABEL version="0.1"
COPY init-database.sql /docker-entrypoint-initdb.d/init-database.sql
