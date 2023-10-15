import React, { useEffect, useState } from 'react';
import { InputProps } from '../../../interfaces/Forms/Input.interface';

const Select = ({ label, name, value, onChange, className = '',  required = false, disabled }: InputProps):JSX.Element => {
  const [images, setImages] = useState([]);

  useEffect(() => {

    fetch('/http://localhost:3000/dockerhub/tags?image=node')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.images) {
          setImages(data.images);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des images :', error);
      });
  }, []);

  return (
    <>
      {label && <label className="font-semibold text-sm text-gray-600 pb-1 block">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`input input-bordered w-full max-w-xs mt-1 ${className}`}
        required={required}
        disabled={disabled}
      >
        <option value="">Sélectionnez une image</option>
        {images.map((image) => (
          <option key={image} value={image}>
            {image}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
