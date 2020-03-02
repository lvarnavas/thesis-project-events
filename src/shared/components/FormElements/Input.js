import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : props.element === 'textarea' ? (
      <textarea
        id={props.id}
        placeholder={props.placeholder}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : props.element ==='cities' ? (
        <select
            id={props.id}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        > 
        <option>{props.option}</option>
        <option>{props.option1}</option>
        <option>{props.option2}</option>
        <option>{props.option3}</option>
        <option>{props.option4}</option>
        <option>{props.option5}</option>
        <option>{props.option6}</option>
        <option>{props.option7}</option>
        <option>{props.option8}</option>
        <option>{props.option9}</option>
        <option>{props.option10}</option>
        <option>{props.option11}</option>
        <option>{props.option12}</option>
        <option>{props.option13}</option>
        <option>{props.option14}</option>
        <option>{props.option15}</option>
        <option>{props.option16}</option>
        <option>{props.option17}</option>
        <option>{props.option18}</option>
        <option>{props.option19}</option>
        <option>{props.option20}</option>
        <option>{props.option21}</option>
        <option>{props.option22}</option>
        <option>{props.option23}</option>
        <option>{props.option24}</option>
        <option>{props.option25}</option>
        <option>{props.option26}</option>
        <option>{props.option27}</option>
        <option>{props.option28}</option>
        <option>{props.option29}</option>
        <option>{props.option30}</option>
        <option>{props.option31}</option>
        <option>{props.option32}</option>
        <option>{props.option33}</option>
        <option>{props.option34}</option>
        <option>{props.option35}</option>
        <option>{props.option36}</option>
        <option>{props.option37}</option>
        <option>{props.option38}</option>
        <option>{props.option39}</option>
        <option>{props.option40}</option>
        <option>{props.option41}</option>
        <option>{props.option42}</option>
        <option>{props.option43}</option>
        <option>{props.option44}</option>
        <option>{props.option45}</option>
        <option>{props.option46}</option>
        <option>{props.option47}</option>
        <option>{props.option48}</option>
        <option>{props.option49}</option>
        <option>{props.option50}</option>
        <option>{props.option51}</option>
        <option>{props.option52}</option>
        <option>{props.option53}</option>
        <option>{props.option54}</option>
        <option>{props.option55}</option>
        <option>{props.option56}</option>
        <option>{props.option57}</option>
        <option>{props.option58}</option>
        <option>{props.option59}</option>
        <option>{props.option60}</option>
        <option>{props.option61}</option>
        <option>{props.option62}</option>
        <option>{props.option63}</option>
        </select>
    ) : props.element === 'categories' ? ( 
        <select
            id={props.id}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}      
        >
        <option>{props.option}</option>
        <option>{props.option1}</option>
        <option>{props.option2}</option>
        <option>{props.option3}</option>
        <option>{props.option4}</option>
        <option>{props.option5}</option>
        <option>{props.option6}</option>
        <option>{props.option7}</option>
        <option>{props.option8}</option>
        <option>{props.option9}</option>
        <option>{props.option10}</option>
        <option>{props.option11}</option>
        <option>{props.option12}</option>
        <option>{props.option13}</option>
        <option>{props.option14}</option>
        <option>{props.option15}</option>
        <option>{props.option16}</option>
        <option>{props.option17}</option>
        </select>
    ) : ( 
        <select
            id={props.id}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}      
        >
        <option>{props.option}</option>
        <option>{props.option1}</option>
        <option>{props.option2}</option>
        <option>{props.option3}</option>
        <option>{props.option4}</option>
        <option>{props.option5}</option>
        <option>{props.option6}</option>
        <option>{props.option7}</option>
        <option>{props.option8}</option>
        <option>{props.option9}</option>
        <option>{props.option10}</option>
        <option>{props.option11}</option>
        <option>{props.option12}</option>
        <option>{props.option13}</option>
        <option>{props.option14}</option>
        <option>{props.option15}</option>
        <option>{props.option16}</option>
        <option>{props.option17}</option>
        <option>{props.option18}</option>
        <option>{props.option19}</option>
        <option>{props.option20}</option>
        <option>{props.option21}</option>
        <option>{props.option22}</option>
        <option>{props.option23}</option>
        <option>{props.option24}</option>
        <option>{props.option25}</option>
        <option>{props.option26}</option>
        <option>{props.option27}</option>
        <option>{props.option28}</option>
        <option>{props.option29}</option>
        <option>{props.option30}</option>
        <option>{props.option31}</option>
        <option>{props.option32}</option>
        <option>{props.option33}</option>
        <option>{props.option34}</option>
        <option>{props.option35}</option>
        <option>{props.option36}</option>
        <option>{props.option37}</option>
        <option>{props.option38}</option>
        <option>{props.option39}</option>
        <option>{props.option40}</option>
        <option>{props.option41}</option>
        <option>{props.option42}</option>
        <option>{props.option43}</option>
        <option>{props.option44}</option>
        <option>{props.option45}</option>
        <option>{props.option46}</option>
        <option>{props.option47}</option>
        <option>{props.option48}</option>
        <option>{props.option49}</option>
        <option>{props.option50}</option>
        <option>{props.option51}</option>
        </select>
    );  
    

    


  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
