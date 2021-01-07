import React from 'react';
import { useFormik}  from 'formik'; 
import { v4 as uuidv4 } from 'uuid';

const Chatform=({User,Room}) =>{
  
    const formik=useFormik({
        initialValues:{
           name:'',
           room:'',
          id: uuidv4(),

        },
        validate: values=>{
            let errors={};
            if(!values.name){
                errors.name="Pole name nie moze byc puste"
            }
            if(!values.room){
              errors.room="Pole room nie moze byc puste"
          }
           
           return errors
        },
    
    onSubmit: values=>{
        User(values.name,values.id)
        Room(values.room)
        
        
    },
    
   
    })
    return (
        <>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className='Chatform'>
        <div>
        <div>
            <label htmlFor="text">Nickname</label>
            <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name}
            />
            {formik.errors.name ? <div className='error'>{formik.errors.name}</div>: null}
          </div>
          <div>
            <label htmlFor="text">Room</label>
            <input id="room" name="room" type="text" onChange={formik.handleChange} value={formik.values.room}
            />
            {formik.errors.room ? <div className='error'>{formik.errors.room}</div>: null}
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
          </div>
        </form>
        </>
      );
    
}

export default Chatform