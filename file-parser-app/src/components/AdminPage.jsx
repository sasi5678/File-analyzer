import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPage.css"
import { useNavigate } from "react-router-dom";




 export const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("adminToken");

  const fetchUsers = async () => {
    console.log("ADMIN TOKEN:", token);

    try {
      const res = await axios.get(
        "http://localhost:8080/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("USERS RESPONSE:", res.data);
      setUsers(res.data);

    } catch (err) {
      console.error("FETCH USERS ERROR:", err.response || err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);



  return (
   
   <>
    <h2 style={{color: "#fff", fontWeight: "900", padding: "40px",fontSize: "48px"}}>Users Management</h2>
    <div className="user-table-wrapper">
    
      <table className="user-table" >
        <thead>
          <tr>
            <th>#</th>
            <th>username</th>
            <th>status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.enabled ? "Active" : "Blocked"}</td>
              <td>
                <button onClick={() => toggleUser(user.id)}>
                  {user.enabled ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};



export const AdminLogin = () => {

  const navigate = useNavigate();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8080/api/auth/admin/login";

    try {
      const response = await axios.post(
        url,
        {
          username: username,
          password: password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      // ✅ IMPORTANT: store token WITHOUT quotes
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin");
      alert("Admin login successful");

    } catch (err) {
      console.error(err);
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-page">
        <div className="admin-login-box">
            
            <h2>ADMIN</h2>
            
            <div className="input-wrapper">
            <input 
                type="text"
                id="admin-name"
                value={username}
                placeholder="username"
                onChange={e => setUsername(e.target.value)}
                required
             />
             

            </div>

            <div className="input-wrapper">

            <input 
                type="password"
                id="admin-password"
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                required
             />

            </div>

             <button className="admin-login-btn" onClick={ (e) => handleAdminLoginSubmit(e) }>Sign In</button>
        </div>
    </div>
  )
}

export default AdminPage