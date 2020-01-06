import React, {Component} from 'react';

class List extends Component{
    render(){
        const cars = ["Honda", "Suzuki","Toyota"];

        return(
            <div className = "App-cont">
             {cars.map((car=><p>{car}</p>))}
           </div> 
        );
    
    }

}

export default List;