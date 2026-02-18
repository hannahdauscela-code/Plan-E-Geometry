# Use an official Nginx image as a parent image
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the static files from the local directory to the container
COPY . .

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]