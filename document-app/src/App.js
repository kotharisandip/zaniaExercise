// src/App.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DocumentCard from './components/DocumentCard';
import './App.css';

const initialData = [
  { type: "bankdraft", title: "Bank Draft", position: 0 },
  { type: "bill-of-lading", title: "Bill of Lading", position: 1 },
  { type: "invoice", title: "Invoice", position: 2 },
  { type: "bank-draft-2", title: "Bank Draft 2", position: 3 },
  { type: "bill-of-lading-2", title: "Bill of Lading 2", position: 4 }
];

function App() {
  const [documents, setDocuments] = useState(initialData);

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedDocument = documents[dragIndex];
    const newDocuments = [...documents];
    newDocuments.splice(dragIndex, 1);
    newDocuments.splice(hoverIndex, 0, draggedDocument);

    setDocuments(newDocuments);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="card-container">
          {documents.map((doc, index) => (
            <DocumentCard
              key={doc.type}
              index={index}
              id={doc.type}
              title={doc.title}
              type={doc.type}
              moveCard={moveCard}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
