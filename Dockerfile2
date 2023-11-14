ARG NODE_VERSION=alpine3.16

#FROM node:${NODE_VERSION} as stage_base
FROM 282865065290.dkr.ecr.us-east-1.amazonaws.com/nodejs18:latest as stage_base
WORKDIR /app

FROM stage_base as stage_deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit-dev

FROM stage_base as stage_build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build

FROM stage_base as stage_prod
ENV NODE_ENV production
USER node
COPY package.json .
COPY --from=stage_deps /app/node_modules ./node_modules
COPY --from=stage_build /app/dist ./dist
CMD npm run start:prod


