import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishYear: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setFormData({
          title: response.data.title,
          author: response.data.author,
          publishYear: response.data.publishYear
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title: formData.title,
      author: formData.author,
      publishYear: formData.publishYear
    };
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, data)
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
      <h1 className='text-3xl my-4'>Edit Book</h1>
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
          <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
        </div>
      )}
    </div>
  );
}

export default EditBook;
