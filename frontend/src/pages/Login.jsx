// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const submit = async e => {
//     e.preventDefault();
//     const res = await axios.post("http://localhost:5000/api/auth/login", form);
//     localStorage.setItem("token", res.data.token);
//     navigate("/dashboard");
//   };

//   return (
//     <form onSubmit={submit}>
//       <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
//       <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
//       <button>Login</button>
//     </form>
//   );
// }

// import axios from "axios";
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post("http://localhost:5000/api/auth/login", form);
//     localStorage.setItem("token", res.data.token);
//     navigate("/dashboard");
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card shadow p-4" style={{ width: "400px" }}>
//         <h3 className="text-center mb-3">Login</h3>

//         <form onSubmit={submit}>
//           <input
//             className="form-control mb-3"
//             placeholder="Email"
//             onChange={e => setForm({ ...form, email: e.target.value })}
//           />

//           <input
//             type="password"
//             className="form-control mb-3"
//             placeholder="Password"
//             onChange={e => setForm({ ...form, password: e.target.value })}
//           />

//           <button className="btn btn-success w-100">Login</button>
//         </form>

//         <p className="text-center mt-3">
//           New user? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            required
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          {/* Password Field */}
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              required
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center mt-3">
          New user? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}


