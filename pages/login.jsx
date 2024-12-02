import React from 'react';

const Login = () => (
  <form className="flex flex-col space-y-4">
    <input type="email" placeholder="Email" className="p-2 border rounded" />
    <input type="password" placeholder="Password" className="p-2 border rounded" />
    <button type="submit" className="p-2 bg-blue-500 text-white rounded">Log In</button>
  </form>
);

export default Login; 