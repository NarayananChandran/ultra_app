FROM node:8-alpine 
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

WORKDIR /usr/app

COPY ./ ./
RUN npm install


CMD ["npm", "start"]
EXPOSE 3000