#!/bin/env bash
# script to run the backend in a container

# Build Docker image from Dockerfile
docker build -t journal .

# Run Docker container with specified parameters
docker run --network host -d --name journal_container journal
