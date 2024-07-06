import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CardComponent from './components/CardComponent';
import OverlayComponent from './components/OverlayComponent';
import SpinnerComponent from './components/SpinnerComponent';
import './App.css';

const App = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/documents')
      .then(response => response.json())
      .then(data => setDocuments(data))
      .catch(error => console.error('Error fetching documents:', error));
  }, []);

  const saveDocuments = useCallback(() => {
    if (!hasChanges) return;

    setIsSaving(true);
    fetch('http://localhost:5000/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(documents)
    })
      .then(response => response.json())
      .then(() => {
        setIsSaving(false);
        setLastSaved(new Date());
        setHasChanges(false);
      })
      .catch(error => {
        setIsSaving(false);
        console.error('Error saving documents:', error);
      });
  }, [documents, hasChanges]);

  useEffect(() => {
    const interval = setInterval(() => {
      saveDocuments();
    }, 5000);

    return () => clearInterval(interval);
  }, [saveDocuments]);

  const moveCard = (dragIndex, hoverIndex) => {
    const updatedDocuments = [...documents];
    const [draggedItem] = updatedDocuments.splice(dragIndex, 1);
    updatedDocuments.splice(hoverIndex, 0, draggedItem);
    setDocuments(updatedDocuments);
    setHasChanges(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="document-grid">
          {documents.map((doc, index) => (
            <CardComponent
              key={doc.type}
              index={index}
              doc={doc}
              onClick={() => setSelectedDoc(doc)}
              moveCard={moveCard}
            />
          ))}
        </div>
        {selectedDoc && (
          <OverlayComponent
            doc={selectedDoc}
            onClose={() => setSelectedDoc(null)}
          />
        )}
        {isSaving && <SpinnerComponent />}
        {lastSaved && (
          <div className="last-saved">
            Last saved: {Math.floor((new Date() - lastSaved) / 1000)} seconds ago
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default App;
