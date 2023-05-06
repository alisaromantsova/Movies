import css from './SearchForm.module.css';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export const SearchForm = ({ setFormValue }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  //   const [submitValue, setSubmitValue] = useState('');
  const [changingValue, setChangingValue] = useState(
    searchParams.get('search')
  );
  const handlerSubmit = e => {
    e.preventDefault();
    if (e.target[0].value.trim()) {
      setSearchParams({ search: e.target[0].value.trim() });
      setFormValue(e.target[0].value.trim());
      //   setSubmitValue(e.target[0].value.trim());
    } else {
      setSearchParams({});
    }
  };
  return (
    <form
      className={css.form}
      onSubmit={e => {
        handlerSubmit(e);
      }}
    >
      <input
        onChange={e => {
          setChangingValue(e.target.value);
          setSearchParams({ search: e.target.value });
        }}
        className={css.input}
        plaseholder="Film name..."
        value={changingValue}
      />
      <button className={css.button}>Search</button>
    </form>
  );
};
