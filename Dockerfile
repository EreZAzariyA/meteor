FROM cimg/node:14.0.0 AS builder
COPY . /meteor/src/app
WORKDIR /meteor/src/app
RUN curl "https://install.meteor.com/?release=2.7.3" | sh
RUN sudo mkdir /meteor/dist
RUN sudo useradd -ms /bin/bash meteor
RUN sudo chown -R meteor:meteor /meteor
RUN sudo chmod 755 /meteor
USER meteor
RUN mkdir /meteor/logs
RUN meteor npm install --production
RUN meteor build --directory /meteor/dist
WORKDIR /meteor/dist/bundle/programs/server/
RUN meteor npm install --production

FROM node:14.0.0-alpine
ENV METEOR_ALLOW_SUPERUSER true
# ENV MONGO_URL "mongodb+srv://erezazariya:59713973@cluster.j92sxm5.mongodb.net/meteor"
ENV MONGO_URL "mongodb://localhost:27017/meteor"
ENV ROOT_URL "http://localhost"
ENV PORT 3000
RUN apk --no-cache add ca-certificates
RUN mkdir /meteor
RUN mkdir /meteor/logs
WORKDIR /meteor
COPY --from=builder /meteor/dist/bundle/ ./dist/bundle/
WORKDIR /meteor/dist/bundle
EXPOSE 3000
CMD ["node", "main.js"]
