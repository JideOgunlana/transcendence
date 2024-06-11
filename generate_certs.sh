#!/bin/bash

# Directory for storing the certificates
CERT_DIR="./nginx/certs"

# Create the directory if it doesn't exist
mkdir -p $CERT_DIR

# Generate a Private Key
openssl genpkey -algorithm RSA -out $CERT_DIR/server.key

# Generate a Certificate Signing Request (CSR)
openssl req -new -key $CERT_DIR/server.key -out $CERT_DIR/server.csr -subj "/C=US/ST=State/L=City/O=Organization/OU=Department/CN=localhost"

# Generate the Self-Signed Certificate
openssl x509 -req -days 365 -in $CERT_DIR/server.csr -signkey $CERT_DIR/server.key -out $CERT_DIR/server.crt

# Clean up the CSR as it's not needed anymore
rm $CERT_DIR/server.csr

echo "Self-signed certificate generated at $CERT_DIR"
