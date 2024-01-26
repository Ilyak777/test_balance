psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
   CREATE DATABASE IF NOT EXISTS balance_test;

   \c balance_test;

   CREATE TABLE IF NOT EXISTS users (
       id SERIAL PRIMARY KEY,
       balance INTEGER
   );

   CREATE TABLE IF NOT EXISTS payment_history (
       id SERIAL PRIMARY KEY,
       user_id INTEGER REFERENCES users(id),
       action VARCHAR(255),
       amount INTEGER,
       ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   INSERT INTO users (id, balance) VALUES (1, 1000);
EOSQL
