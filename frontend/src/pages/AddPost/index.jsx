import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../../axios';

export const AddPost = () => {

  const navigate = useNavigate()

  const imageUrl = '';
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');

  const [loading, setLoading] = React.useState('');

  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);



  const onSubmit = async () => {
    try {
      setLoading(true)

      const fields = {
        title,
        tags,
        text
      }

      const { data } = await axios.post('/posts', fields)

      const id = data._id
      navigate(`/posts/${id}`)


    } catch (error) {
      console.warn('Ошибка при создании поста!')
    }
  }



  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );


  // if (window.localStorage.getItem('token') && !isAuth) {
  //   return <Navigate to="/" />
  // }


  console.log({text, tags, title});
  

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard" 
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        value={tags}
        onChange={e => setTags(e.target.value)}
        classes={{ root: styles.tags }} 
        variant="standard" 
        placeholder="Тэги" 
        fullWidth 
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button 
          onClick={onSubmit}
          size="large" 
          variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
