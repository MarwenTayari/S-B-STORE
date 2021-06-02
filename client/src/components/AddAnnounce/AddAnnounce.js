import React from 'react'


const AddAnnounce = () => {
    return (
        <form onSubmit ={addNow} >
            <div>
                <label>Title : </label>
                <input type ="text" name="title" onChange={handleChange}/>
            </div>
            <div>
                <label>Description : </label>
                <input type ="text" name="description" onChange={handleChange}/>
            </div>
            <div>
                <label>Price : </label>
                <input type ="number" name="price" onChange={handleChange}/>
            </div>
            <div>
                <label>Upload Images : </label>
                <input type ="file" name="avatar" onChange={handleChange}/>
            </div>
            <div>
                <label >Category : </label>
                    <select  name="category"  onClick={handleChange}>
                        <option  value=""></option>
                        <option  value="automobile">Automobile</option>
                        <option  value="immobilier">Immobilier</option>
                        <option  value="loisir">Loisir</option>
                    </select>
            </div>
            <div>
                <label >Location : </label>
                <select  name="location"  onClick={handleChange}>
                    <option  value="">Tunis</option>
                    <option  value="tunis">Tunis</option>
                    <option  value="sousse">Sousse</option>
                    <option  value="sfax">Sfax</option>
                    <option  value="benzart">Benzart</option>
                    <option  value="gabes">Gabes</option>
                </select>
            </div>
            <button type="submit">Add</button>          
        </form>
    )
}

export default AddAnnounce
