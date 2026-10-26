FROM node:20-alpine
WORKDIR /app
COPY . /app
WORKDIR /app/backend
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
