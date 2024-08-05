FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "dev"]