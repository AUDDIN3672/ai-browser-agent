FROM node:18-bullseye

# install system tools
RUN apt-get update && apt-get install -y 
curl 
wget 
ca-certificates

# create app folder
WORKDIR /app

# install flowise locally
RUN npm install flowise

# install pinchtab
RUN wget https://github.com/pinchtab/pinchtab/releases/latest/download/pinchtab-linux-amd64 -O /usr/local/bin/pinchtab
RUN chmod +x /usr/local/bin/pinchtab

EXPOSE 3000
EXPOSE 9867

CMD pinchtab & npx flowise start