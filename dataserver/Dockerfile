# Generates a Docker image that contains the data-server Python script
# for running it in production.

FROM python:3-alpine
RUN apk add --no-cache \
    build-base \
    font-noto \
    jpeg-dev \
    cairo-dev \
  && pip3 install --no-cache-dir cairosvg web3

RUN adduser -D python-user
COPY --chown=python-user:python-user dataserver/serve.py /usr/local/bin
COPY --chown=python-user:python-user out/NftMetadata.sol/NftMetadata.json /usr/local/share

LABEL description="Runs the Xaya NFT metadata server"
EXPOSE 8000
USER python-user
ENTRYPOINT [ \
  "/usr/local/bin/serve.py", \
  "--port=8000", \
  "--contract_data=/usr/local/share/NftMetadata.json" \
]
