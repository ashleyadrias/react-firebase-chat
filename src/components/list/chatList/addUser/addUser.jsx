import {useState} from 'react';
import "./addUser.css";

const AddUser = () => {

  const [user, setUser] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
  };

    return (
      <div className="addUser">
            <form>
              <input type="text" placeholder="Username" name="username" />
              <button>Search</button>
            </form>
              <div className="user">
                <div className="detail">
                  <img src="./avatar.png" alt="" />
                  <span>Jane Doe</span>
                </div>
                <button>Add User</button>
              </div>
      </div>
    )
  }
  
  export default AddUser