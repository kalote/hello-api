FROM node:lts-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm i && npm run build
USER node
CMD ["npm", "start"]
