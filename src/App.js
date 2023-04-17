import { connect, useDispatch } from "react-redux";
import CompletedComponent from "./Components/Completed";
import InprogressComponent from "./Components/Inprogess";
import OpenComponents from "./Components/Open";
import { useEffect } from "react";
import axios from "axios";


function App({ open, inprogress, completed, posts }) {
  const count = open.length + inprogress.length + completed.length;


  const dispatch = useDispatch();

  const getTodos = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
      dispatch({ type: 'GET_TODOS', payload: res.data.slice(0, 50) });
    });
  }

  useEffect(getTodos, []);


  return (
    <div className="container py-3 m-auto">
      <div className="row">
        <div className="col-xs-12">
          <div className="card p-4">
            <h3>Umumiy tasklar soni: {count}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <OpenComponents />
          </div>
          <div className="col-md-4">
            <InprogressComponent />
          </div>
          <div className="col-md-4">
            <CompletedComponent />
          </div>
        </div>
      </div>

      <hr />

      {/* Posts */}
      {posts?.map((item, i) => (
        <p key={item.id}>{i + 1}. {item.title}</p>
      ))}
    </div >
  );
}

export default connect((state) => ({ ...state }), null)(App);