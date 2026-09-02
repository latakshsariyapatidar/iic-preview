#!/bin/sh
set -e

echo "Pushing database schema..."
npx prisma db push

echo "Generating Prisma client..."
npx prisma generate

echo "Starting application..."
exec "$@"
