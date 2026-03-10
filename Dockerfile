FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install -y \ncurl \nwget \ngnupg \nnodejs \nnpm \nca-certificates

# install flowise
RUN npm install -g flowise

# install pinchtab
RUN wget https://github.com/pinchtab/pinchtab/releases/latest/download/pinchtab-linux-amd64 -O /usr/local/bin/pinchtab
RUN chmod +x /usr/local/bin/pinchtab

EXPOSE 3000
EXPOSE 9867

CMD pinchtab & flowise start