-- Connect to the newly created database
\c document_db;

-- Create a table to store documents
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    position INTEGER NOT NULL
);

INSERT INTO documents (type, title, position) VALUES
('bankdraft', 'Bank Draft', 0),
('bill-of-lading', 'Bill of Lading', 1),
('invoice', 'Invoice', 2),
('bank-draft-2', 'Bank Draft 2', 3),
('bill-of-lading-2', 'Bill of Lading 2', 4);
