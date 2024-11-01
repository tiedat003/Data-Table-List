import 'bootstrap/dist/css/bootstrap.min.css';
import './AuthPage.css'
import { useState, useEffect } from 'react';
import ListComponent from '../../common/components/ListComponent'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { setAlbums } from '../../home/pages/redux/homeReducer';
import { IAlbum } from '../../../models/album';
import ListPage from '../../home/pages/redux/ListPage';
import LoginForm from '../components/LoginForm';


const AuthPage = () => {
    // Hiển thị dữ liệu ảnh sau khi fetch thành công

    const [title, setTitle] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    // Handle title change
    const handleTitleChange = (e: { target: { value: any; }; }) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setIsButtonDisabled(newTitle.trim() === ""); // Disable if title is empty
        console.log(newTitle);

    };
    return (

        <div className="list-group">
            <>{ListPage}</>

            <button
                type="submit"
                className="btn btn-primary"
                disabled={isButtonDisabled}>
                {isButtonDisabled ? "Confirm" : ""}
            </button>
            <button
                type="reset"
                className="btn btn-secondary"
                disabled={isButtonDisabled}>
                {isButtonDisabled ? "Reset" : "Reset"}
            </button>

            <div className="input-group mb-3">
                <ListComponent
                    type='text'
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div className="input-group mb-3">
                <ListComponent
                    type='text'
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div className="input-group mb-3">
                <ListComponent
                    type='text'
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
        </div>
    )
}
export default AuthPage