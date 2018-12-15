import React from 'react';
import RepoListEntity from './RepoListEntity.jsx';

const RepoList = (props) => {

  const reposList = props.repos.map(repo => (
    <RepoListEntity repo={repo} key={repo._id} />
  ));

  return (
    <div className="repos-list">
      <h3>numbers of repos: {props.repos.length}</h3>
      {reposList}
    </div>
  );
}

export default RepoList;
