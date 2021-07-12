import React from 'react';
import './Person.css';
// import Radium from 'radium';
// above line is generally used to import the React.createElement() thing so that JSX used can be converted into that syntax so that it can be understood by the react software

// see the way of how the attributes are accessed in the function(this.attribute_name) which are indirectly accessed in the class in main file(here  App.js) 

const person = (x) => {
    // const st={
    //     '@media (min-width: 500px)':{
    //         width: '450px'
    //     }
    // }

    return (
        <div className="person" >
            <p onClick={x.click}> I'm {x.name} and my age is {x.age} .</p>
            {x.children}
            <input type="text" onChange={x.changed} value={x.name}/>
        </div>
    )
    // any dynamic component in JSX can be interpreted as dynamic component when they are enclosed in curly braces { } otherwise they interpreted as text in JSX
}

export default person;