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

ENV POSTGRES_USER=clanus
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=plants
ENV POSTGRES_HOST=plants.chimlwu7ixbj.us-east-2.rds.amazonaws.com
ENV NODE_ENV=production


CMD ["sh", "scripts/bootstrap.sh"]
