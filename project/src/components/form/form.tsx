import React, { useEffect, useState } from 'react';
import { sendCommentAction } from '../../store/api-action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { MAX_LENGTH_COMMENT, MIN_LENGTH_COMMENT } from '../../const';

type PropsForm = { hotelId: number };


function Form(props: PropsForm): JSX.Element {
  const dispatch = useAppDispatch();
  const formState5 = useAppSelector((state) => state.formState);

  const { hotelId } = props;

  const [formState, setFormState] = useState({
    rating: 0,
    review: '',
    isDisabledButton: true,
    isDisabledInput: false,
    isRating: false,
  });

  function handleValue(value: number) {
    setFormState({
      ...formState,
      rating: value,
      isRating: true,
    });

    if (formState.review.length >= MIN_LENGTH_COMMENT && formState.review.length <= MAX_LENGTH_COMMENT) {
      setFormState((prevState) => ({
        ...prevState,
        isDisabledButton: false,
      }));
    }
  }

  function changeText(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    evt.preventDefault();

    if (evt.target.textLength >= MIN_LENGTH_COMMENT && evt.target.textLength <= MAX_LENGTH_COMMENT && formState.isRating) {

      setFormState((prevState) => ({
        ...prevState,
        review: evt.target.value,
        isDisabledButton: false,
      }));

    }
    else {

      setFormState((prevState) => ({
        ...prevState,
        review: evt.target.value,
        isDisabledButton: true,
      }));

    }

  }

  const onSubmit = (comment: string, rating: number) => {
    dispatch(sendCommentAction({ hotelId, comment, rating }));

  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit(formState.review, formState.rating);
    // const form = evt.target;
    // form.reset();
    // console.log(evt);

  };

  useEffect(() => {
    if (formState5 === 'disabled') {
      setFormState((prevState) => ({
        ...prevState,
        isDisabledInput: true,
        isDisabledButton: true,
      }));
    }
    if (formState5 === 'initial') {
      setFormState((prevState) => ({
        rating: 0,
        // ...prevState,
        review: '',
        isDisabledButton: true,
        isDisabledInput: false,
        isRating: false,
      }));
    }

  }, [formState5]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
          onChange={() => handleValue(5)}
          disabled={formState.isDisabledInput}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
          onChange={() => handleValue(4)}
          disabled={formState.isDisabledInput}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
          onChange={() => handleValue(3)}
          disabled={formState.isDisabledInput}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
          onChange={() => handleValue(2)}
          disabled={formState.isDisabledInput}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-star"
          type="radio"
          onChange={() => handleValue(1)}
          disabled={formState.isDisabledInput}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formState.review}
        onChange={changeText}
        disabled={formState.isDisabledInput}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={formState.isDisabledButton}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Form;
