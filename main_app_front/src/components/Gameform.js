import React from 'react';
import { useFormik}  from 'formik'; 
import { v4 as uuidv4 } from 'uuid';

const Gameform=({User}) =>{
  
    const formik=useFormik({
        initialValues:{
           name:'',
          id: uuidv4(),

        },
        validate: values=>{
            let errors={};
            if(!values.name){
                errors.name="Pole name nie moze byc puste"
            }
           
           
           return errors
        },
    
    onSubmit: values=>{
        User(values.name)
    },
    
   
    })
    return (
        <>
        <form onSubmit={formik.handleSubmit} >
        <div>
        <div>
            <label htmlFor="text">Nickname</label>
            <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name}
            />
            {formik.errors.name ? <div className='error'>{formik.errors.name}</div>: null}
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
          </div>
        </form>
        </>
      );
    
}

export default Gameform;