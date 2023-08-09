import axios from 'axios'
import { useState } from 'react'
import bulma from 'bulma/css/bulma.css'

const App = ()=>{
    const [data,setData]=useState([])
    const [name,setName]=useState("")
    const [team,setTeam]=useState('')

    const HandleClick=async ()=>{
            await axios.post('http://localhost:3031/posts',{"name":name,"team":team})
            .then(response => {
                console.log('New post created:', response.data);
              })
              .catch(error => {
                console.error('Error creating post:', error);})
              

            await axios.get('http://localhost:3031/posts')
            .then(res=>setData(res.data))
            .catch(err=>console.log(err))

            setName('');
            setTeam('')
    }
    const handleChangeName=(event)=>{
        setName(event.target.value)
    }
    const handleChangeTeam=(event)=>{
        setTeam(event.target.value)
    }
    const handleDelete=(objectId)=>async (event)=>{
            await axios.delete(`http://localhost:3031/posts/${objectId}`)
            .then(response => {
                console.log('New post created:', response.data);
              })
              .catch(error => {
                console.error('Error creating post:', error);})
              

            await axios.get('http://localhost:3031/posts')
            .then(res=>setData(res.data))
            .catch(err=>console.log(err))
    }

    return (
        <>
            <div style={{display:'flex', margin:"10px"}}>
                <input className='input is-rounded' placeholder='Name' value={name} onChange={handleChangeName}/>
                <input className='input is-rounded' placeholder='Club Name' value={team} onChange={handleChangeTeam}/>
                <button onClick={HandleClick} className='button is-rounded'>
                    add Detail
                </button>
            </div>
            <div style={{margin:"10px",display:'flex',justifyContent:'space-around'}}>
                <table className='table is-bordered'>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Club Name</th>
                        </tr>
                    </thead>
                    <tbody>
                            {data.map((details,index)=>{
                                return (<tr>
                                    <td onClick={handleDelete(details.id)} >{index}</td>
                                    <td>{details.name}</td>
                                    <td>{details.team}</td>
                                </tr>)
                            })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default App;