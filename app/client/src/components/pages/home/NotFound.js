import React from 'react';
import { NotFoundText } from '../../../text';

export default function NotFound() {
  return (
    <div>
      <section className="content">
        <div className="error-page">
          <div className="error-content">
            {NotFoundText.MESSAGE}
          </div>
        </div>
      </section>
    </div>
  );
}
