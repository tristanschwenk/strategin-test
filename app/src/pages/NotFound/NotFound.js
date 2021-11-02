import React from 'react';
import { Link } from 'react-router-dom';
import { Page} from "tabler-react";


export function NotFound() {
  return (
    <Page className="page-center">
      <div className="container-tight py-4">
       <div className="empty">
          <div className="empty-header">
            404
          </div>
          <div className="empty-title">
          Oops… You just found an error page
          </div>
          <div className="empty-subtitle text-muted">
          We are sorry but the page you are looking for was not found
          </div>
          <div class="empty-action">
            <Link to="/users">Take me home</Link>
          </div>
       </div>
      </div>
    </Page>
  );
} 

