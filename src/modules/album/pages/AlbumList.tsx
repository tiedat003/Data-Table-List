import React, { useState, useEffect } from 'react';
import '../Album.css'

interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

const AlbumList = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [editablePhotos, setEditablePhotos] = useState<Photo[]>([]);
    const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos?&_start=1&_end=10')
            // fetch('API + &_start=1&_end=10')
            .then((response) => response.json())
            .then((data) => {
                setPhotos(data);
                setEditablePhotos(data);
                const initialInputValues: { [key: number]: string } = {};
                data.forEach((photo: { id: string | number; title: any; }) => {
                    initialInputValues[photo.id as number] = photo.title;
                });
                setInputValues(initialInputValues);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleInputBlur = (id: string | number) => {
        const updatedPhotos = editablePhotos.map((photo) =>
            photo.id === id ? { ...photo, title: inputValues[id] } : photo
        );
        setEditablePhotos(updatedPhotos);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
        setInputValues({
            ...inputValues,
            [id]: e.target.value
        });
    };

    const handleConfirm = () => {
        setPhotos(editablePhotos);
    };

    const handleReset = () => {
        setEditablePhotos(photos);
        const resetInputValues: { [key: number]: string } = {};
        photos.forEach(photo => {
            resetInputValues[photo.id] = photo.title;
        });
        setInputValues(resetInputValues);
    };

    return (
        <div className='container'>
            <button onClick={handleConfirm}>Confirm Update</button>
            <button onClick={handleReset}>Reset</button>
            <div className='box'>
                {editablePhotos.map((photo) => (
                    <div className='content' key={photo.id}>
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                        <br />
                        <input
                            type="text"
                            value={inputValues[photo.id] || ''}
                            onChange={(e) => handleInputChange(e, photo.id)}
                            onBlur={() => handleInputBlur(photo.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumList;
