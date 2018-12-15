import React from 'react';

const RepoListEntity = (props) => (
 <div className="repo">
    <span> {props.repo.name} </span>
    <span>:</span>
    <a href={props.repo.html_url}>{props.repo.html_url}</a>
  </div>
)

export default RepoListEntity;