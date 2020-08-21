FROM node:12
MAINTAINER Chris Lanus <cqlanus@gmail.com>

# set working directory
WORKDIR /app

ENV PORT 9001

COPY package.json ./
COPY package-lock.json ./
RUN apt-get update && apt-get install -y \
  python3 \
  python3-pip
RUN npm install --silent

# add app
COPY . ./
RUN pip3 install -r requirements.txt

## THE LIFE SAVER
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
# RUN chmod +x /wait
RUN chmod +x /app/scripts/bootstrap.sh

EXPOSE 9001

## Launch the wait tool and then your application
# CMD /wait && npm run boot
CMD ["npm", "run", "boot"]
