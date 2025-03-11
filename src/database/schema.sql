CREATE DATABASE cadastro;

\c cadastro;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO users (name, email) VALUES 
('André Lucca', 'andre.lucca@email.com'),
('Felipe Santos', 'felipe.santos@email.com'),
('Eduardo Correia', 'eduardo.correia@email.com');