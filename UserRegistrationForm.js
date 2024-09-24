import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './UserRegistrationForm.css'; 
const UserRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://dummyjson.com/products/add', data);
      alert('Usuário registrado com sucesso!'); 
      console.log(response.data);
    } catch (error) {
      alert('Erro ao registrar usuário!');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Novo Usuário</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Nome é obrigatório' })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Email inválido',
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Senha é obrigatória' })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
