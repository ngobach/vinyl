FROM node:alpine
LABEL maintainer="Ngo Xuan Bach <thanbaiks@gmail.com>" \
  org.label-schema.name="vinyl"

RUN yarn global add serve
WORKDIR /app
ADD package.json ./
ADD dist ./dist
EXPOSE 8080

CMD ["yarn", "start"]
