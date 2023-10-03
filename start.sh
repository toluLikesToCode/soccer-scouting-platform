#!/bin/bash

# Function to show help
show_help() {
    echo "Available commands:"
    echo "  build   - Build the Docker images"
    echo "  start   - Start the Docker Compose services"
    echo "  stop    - Stop the Docker Compose services"
    echo "  restart - Restart the Docker Compose services"
    echo "  help    - Show this help message"
}

# Build the Docker images
build() {
    docker-compose build
}

# Start the Docker Compose services
start() {
    docker-compose up -d
}

# Stop the Docker Compose services
stop() {
    docker-compose down
}

# Restart the Docker Compose services
restart() {
    stop
    start
}

# Parse and execute the command
if [ -z "$1" ]; then
    start  # Default action if no argument is provided
else
    case "$1" in
        build)
            build
            ;;
        start)
            start
            ;;
        stop)
            stop
            ;;
        restart)
            restart
            ;;
        help)
            show_help
            ;;
        *)
            show_help
            exit 1
            ;;
    esac
fi

exit 0
