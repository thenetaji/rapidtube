# Use the latest Node.js image
FROM node:latest

# Install necessary packages including Python 3 and pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv

# Create a Python virtual environment and install yt-dlp
RUN python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install yt-dlp

# Add the virtual environment's bin directory to PATH
ENV PATH="/opt/venv/bin:$PATH"

# Set working directory for your Node.js application
WORKDIR /usr/src/app

# Copy package.json files and install Node dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 2626

# Start the application
CMD ["npm", "start"]
