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
