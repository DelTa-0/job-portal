#!/bin/sh
set -e

echo "---- Running migrations ----"
npx sequelize-cli db:migrate || {
  echo "Migration failed"
  exit 1
}

echo "---- Running seeds ----"
npx sequelize-cli db:seed:all || {
  echo "Seeding failed"
  exit 1
}

exec "$@"
