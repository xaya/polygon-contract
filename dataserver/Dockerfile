# Generates a Docker image that contains the data-server Python script
# for running it in production.

# Use a first stage to build the smart contract with the Foundry image.
# This ensures that the Docker file can be built as-is from the
# repository, without having to locally build first.
FROM ghcr.io/foundry-rs/foundry:stable AS foundry
# The Foundry image uses non-root user "foundry" by default.  But with this
# user, some permission errors occur.  In this case, there is no harm in using
# root during the build for simplicity.
USER root
WORKDIR /build
COPY . .
RUN forge build

FROM python:3-alpine
RUN apk add --no-cache \
    build-base \
    font-noto \
    jpeg-dev \
    cairo-dev \
  && pip3 install --no-cache-dir cairosvg web3

RUN adduser -D python-user
COPY --chown=python-user:python-user dataserver/serve.py /usr/local/bin
COPY --chown=python-user:python-user \
  --from=foundry /build/out/NftMetadata.sol/NftMetadata.json \
  /usr/local/share

LABEL description="Runs the Xaya NFT metadata server"
EXPOSE 8000
USER python-user
ENTRYPOINT [ \
  "/usr/local/bin/serve.py", \
  "--port=8000", \
  "--contract_data=/usr/local/share/NftMetadata.json" \
]
