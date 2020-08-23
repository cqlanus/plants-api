FROM node:latest
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

EXPOSE 9001

CMD ["sh", "scripts/bootstrap.sh"]
