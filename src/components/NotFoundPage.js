import React from 'react';
import './NotFoundPage.css';

/**
 * Element to display when a page is not found.
 * @return {JSX.Element} A 404: Page Not Found! Element
 */
export default function NotFoundPage() {
  return (
    <h1 data-testid="not-found-page">404: Page Not Found!</h1>
  );
}
