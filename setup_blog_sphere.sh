#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Clone the project from GitHub
echo "🚀 Cloning the BlogSphere project from GitHub..."
git clone https://github.com/Darkrider0007/blog_sphere.git

# Move into the project directory
cd blog_sphere
echo "📂 Moved into the project directory!"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start the development server
echo "🔥 Starting the development server..."
npm run dev &

# Open the project in the default browser
echo "🌐 Opening http://localhost:5173/ in your default browser..."
xdg-open http://localhost:5173/ || open http://localhost:5173/ || start http://localhost:5173/

echo "✅ BlogSphere is now running at http://localhost:5173/"

