
import React from 'react';
import '../css/style.css';
import Badge from './Badge'

function Card({data}) {
  return (
    <div className="col-md-6 col-lg-3">
    <div className="card">
      <div className="card-body p-4 text-center">
        <span className="avatar avatar-xl mb-3 avatar-rounded">{`${data.firstName.slice(0,1)}${data.lastName.slice(0,1)}`}</span>
        <h3 className="m-0 mb-1"><p >{data.firstName} {data.lastName}</p></h3>
        <div className="text-muted">User</div>
        <div>{data.me && <Badge>Me</Badge>}</div>
      </div>
    </div>
  </div>
  );
}

export default Card;
