import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';

const CreateBooks = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishYear: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveBook = () => {
    const data = {
      title: formData.title,
      author: formData.author,
      publishYear: formData.publishYear
    };
    setLoading(true);
    axios.post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add Book</h1>
      {loading ? (<Spinner />) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input
              type="text"
              name="publishYear"
              value={formData.publishYear}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>Save</button>
        </div>
      )}
    </div>
  );
}

export default CreateBooks;
