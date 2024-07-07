import React, { useState, useRef, useCallback } from 'react';
import EveryPiece from '../EveryPiece';
import { FluentRename20Filled, IcBaselineDelete, IcRoundDoneOutline, CiUndo } from '../Icons';
import QuestionTitle from '../QuestionTitle';

function UDQ(props) {
  const [files, setFiles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const fileInputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const dropZoneRef = useRef(null);

  const handleFile = useCallback((file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFiles(prevFiles => [...prevFiles, {
        file: file,
        name: file.name,
        originalName: file.name,
        preview: file.type.startsWith('image/') ? reader.result : null
      }]);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = [...e.dataTransfer.files];
    files.forEach(handleFile);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRename = (index) => {
    if (editingIndex === index) {
      setEditingIndex(null);
    } else {
      setEditingIndex(index);
    }
  };

  const handleNameChange = (index, newName) => {
    const newFiles = [...files];
    newFiles[index].name = newName;
    setFiles(newFiles);
  };

  const handleUndoRename = (index) => {
    const newFiles = [...files];
    newFiles[index].name = newFiles[index].originalName;
    setFiles(newFiles);
    // setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const Blurrrrr = (index) => {
    if (editingIndex === index) {
      setEditingIndex(null)
    }
  }

  const handleKeyDown = (index, key) => {
    if (key === 'Enter') {
      Blurrrrr(index);
    }
  };

  return (
    <EveryPiece>
      <QuestionTitle question={props.question} description={props.description || "您可以上傳多個檔案並將其重新命名"} required={props.required}></QuestionTitle>

      <div
        ref={dropZoneRef}
        //  className={`space-y-2 `}
        className={`space-y-2 p-[0.8rem] -mx-[0.8rem] border-2 border-dashed rounded-lg ${isDragging ? 'border-blue-700 bg-blue-50' : 'border-gray-300'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {files.map((file, index) => (
          <div key={index} className="flex items-center space-x-4">

            <div className={`w-[4.8rem] h-[4.8rem] ${isDragging ? "bg-blue-50" : "bg-slate-200"} flex items-center justify-center`}>
              {file.preview ? (
                <img src={file.preview} alt="預覽" className="max-w-full max-h-full object-contain" />
              ) : (
                <span className="text-3xl">📄</span>
              )}
            </div>

            <input
              type="text"
              value={file.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              onBlur={(e) => Blurrrrr(index)}
              onKeyDown={(e) => handleKeyDown(index, e.key)}
              readOnly={editingIndex !== index}
              className="flex-grow myjx-input"
            />

            <button
              onClick={() => handleRename(index)}
              className="w-8 h-8 flex items-center justify-center text-blue-700 hover:text-blue-900"
            >
              {editingIndex === index ? <IcRoundDoneOutline /> : <FluentRename20Filled />}
            </button>

            {editingIndex === index && (
              <button
                onClick={() => handleUndoRename(index)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-800"
              >
                <CiUndo />
              </button>
            )}

            {editingIndex !== index &&
              <button
                onClick={() => handleDelete(index)}
                className="w-8 h-8 flex items-center justify-center text-red-800 hover:text-red-900"
              >
                <IcBaselineDelete />
              </button>}

          </div>
        ))}

        <div className="flex items-center space-x-4 cursor-pointer" onClick={handleUploadClick}>
          <div className={`w-12 h-12 ${isDragging ? "bg-blue-50" : "bg-slate-200"} flex items-center justify-center`}>
            <span className="text-2xl">+</span>
          </div>
          <span className="text-gray-500">點擊或拖放文件到此處上傳</span>
        </div>

      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

    </EveryPiece>
  );
}

export default UDQ;