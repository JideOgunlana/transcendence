FROM nginx:alpine
RUN apk add --no-cache openssl
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /etc/nginx/certs
RUN openssl genpkey -algorithm RSA -out /etc/nginx/certs/server.key && \
    openssl req -new -key /etc/nginx/certs/server.key -out /etc/nginx/certs/server.csr -subj "/C=US/ST=State/L=City/O=Organization/OU=Department/CN=localhost" && \
    openssl x509 -req -days 365 -in /etc/nginx/certs/server.csr -signkey /etc/nginx/certs/server.key -out /etc/nginx/certs/server.crt && \
    rm /etc/nginx/certs/server.csr
RUN ls -l /etc/nginx/certs
CMD ["nginx", "-g", "daemon off;"]