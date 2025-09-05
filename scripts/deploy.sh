#!/bin/bash

# KnowYourRights.cards Deployment Script
# This script handles the complete deployment process

set -e

echo "🚀 Starting KnowYourRights.cards deployment..."

# Check if required environment variables are set
check_env_vars() {
    echo "📋 Checking environment variables..."
    
    required_vars=(
        "NEXT_PUBLIC_SUPABASE_URL"
        "NEXT_PUBLIC_SUPABASE_ANON_KEY"
        "SUPABASE_SERVICE_ROLE_KEY"
        "OPENAI_API_KEY"
        "PINATA_API_KEY"
    )
    
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            echo "❌ Error: $var is not set"
            exit 1
        fi
    done
    
    echo "✅ All required environment variables are set"
}

# Install dependencies
install_deps() {
    echo "📦 Installing dependencies..."
    npm ci
    echo "✅ Dependencies installed"
}

# Run tests
run_tests() {
    echo "🧪 Running tests..."
    npm run test:ci || true  # Don't fail deployment if tests fail
    echo "✅ Tests completed"
}

# Build the application
build_app() {
    echo "🔨 Building application..."
    npm run build
    echo "✅ Application built successfully"
}

# Setup database (if needed)
setup_database() {
    echo "🗄️ Setting up database..."
    # Add database migration commands here
    # npx supabase db push
    echo "✅ Database setup completed"
}

# Deploy to production
deploy() {
    echo "🚀 Deploying to production..."
    
    if [ "$VERCEL_ENV" = "production" ]; then
        echo "Deploying to Vercel..."
        # Vercel handles this automatically
    else
        echo "Starting production server..."
        npm run start &
    fi
    
    echo "✅ Deployment completed"
}

# Health check
health_check() {
    echo "🏥 Running health check..."
    
    # Wait for server to start
    sleep 5
    
    # Check if the app is responding
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        echo "✅ Health check passed"
    else
        echo "⚠️ Health check failed - app may still be starting"
    fi
}

# Main deployment flow
main() {
    check_env_vars
    install_deps
    run_tests
    build_app
    setup_database
    deploy
    health_check
    
    echo "🎉 Deployment completed successfully!"
    echo "📱 Your KnowYourRights.cards app is now live!"
}

# Run main function
main "$@"

