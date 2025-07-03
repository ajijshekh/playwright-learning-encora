# Use official Playwright base image
FROM mcr.microsoft.com/playwright:v1.52.0-noble

# Copy only package files first (better cache)
COPY package*.json ./

RUN mkdir /app

# Create app directory
WORKDIR /app
COPY . /app/

RUN npm install --force
RUN npx playwright install