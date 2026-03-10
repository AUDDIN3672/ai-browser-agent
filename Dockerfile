FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
curl \
wget \
gnupg \
nodejs \
npm \
ca-certificates

# install Flowise
RUN npm install -g flowise

# install PinchTab
RUN wget https://github.com/pinchtab/pinchtab/releases/latest/download/pinchtab-linux-amd64 -O /usr/local/bin/pinchtab
RUN chmod +x /usr/local/bin/pinchtab

EXPOSE 3000
EXPOSE 9867

CMD pinchtab & flowise start