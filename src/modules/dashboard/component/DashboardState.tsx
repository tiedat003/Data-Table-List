import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function DashboardState(props: { type: string; value: string; onChange: Function }) {
    const { type } = props;
    return (
        <>
            <input
                type={type}
                className="form-control"
                placeholder='Text'
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
        </>
    )
}

interface Album {
    id: number;
    title: string;
}

interface AlbumEditorProps {
    album: Album;
    onTitleChange: (updatedAlbum: Album) => void;
}

const AlbumEditor: React.FC<AlbumEditorProps> = ({ album, onTitleChange }) => {
    const [newTitle, setNewTitle] = useState(album.title);

    // Hàm xử lý khi người dùng thay đổi title
    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedTitle = e.target.value;
        setNewTitle(updatedTitle);

        // Cập nhật lại album.title
        const updatedAlbum = { ...album, title: updatedTitle };

        // Gọi hàm callback để gửi lại dữ liệu album đã thay đổi cho parent
        onTitleChange(updatedAlbum);
    };

    return (
        <div>
            <input
                type='text'
                className="form-control"
                placeholder='Text'
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={newTitle}
                onChange={onChangeTitle}
            />

        </div>
    );
};

export default DashboardState;
