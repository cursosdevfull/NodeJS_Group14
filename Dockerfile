FROM 282865065290.dkr.ecr.us-east-1.amazonaws.com/nodejs18:latest as builder

WORKDIR /build

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM 282865065290.dkr.ecr.us-east-1.amazonaws.com/nodejs18:latest

WORKDIR /app

COPY --from=builder /build/dist ./dist
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json .

CMD ["npm", "run", "start:prod"]