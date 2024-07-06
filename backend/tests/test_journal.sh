#!/bin/env bash

# Set your API base URL
API_BASE_URL="http://206.189.123.133:8000/api/v1"

# Set the session web cookie (access_token_cookie)
SESSION_COOKIE="${SESSION_COOKIE}"

# Function to make a POST request to create a new journal
create_journal() {
    title=$1
    content=$2
    category=$3

    echo "Creating new journal..."
    curl -X POST "${API_BASE_URL}/journals" \
         -H "Cookie: ${SESSION_COOKIE}" \
         -H "Content-Type: application/json" \
         -d "{\"title\":\"${title}\",\"content\":\"${content}\",\"category\":\"${category}\"}"
    echo ""
}

# Function to make a GET request to retrieve all journals
get_all_journals() {
    echo "Fetching all journals..."
    curl -X GET "${API_BASE_URL}/journals" \
         -H "Cookie: ${SESSION_COOKIE}"
    echo ""
}

# Function to make a GET request to retrieve a specific journal by ID
get_journal_by_id() {
    journal_id=$1
    echo "Fetching journal with ID ${journal_id}..."
    curl -X GET "${API_BASE_URL}/journals/${journal_id}" \
         -H "Cookie: ${SESSION_COOKIE}"
    echo ""
}

# Function to make a PUT request to update a specific journal by ID
update_journal() {
    journal_id=$1
    title=$2
    content=$3
    category=$4

    echo "Updating journal with ID ${journal_id}..."
    curl -X PUT "${API_BASE_URL}/journals/${journal_id}" \
         -H "Cookie: ${SESSION_COOKIE}" \
         -H "Content-Type: application/json" \
         -d "{\"title\":\"${title}\",\"content\":\"${content}\",\"category\":\"${category}\"}"
    echo ""
}

# Function to make a DELETE request to delete a specific journal by ID
delete_journal() {
    journal_id=$1
    echo "Deleting journal with ID ${journal_id}..."
    curl -X DELETE "${API_BASE_URL}/journals/${journal_id}" \
         -H "Cookie: ${SESSION_COOKIE}"
    echo ""
}

# Test cases
# Adjust these function calls based on your specific API endpoints and test scenarios
create_journal "Test Journal 3" "Content of Test Journal 2" "Personal"
get_all_journals
get_journal_by_id 3
update_journal 3 "Updated Test Journal 3" "Updated content" "Work"
delete_journal 3
