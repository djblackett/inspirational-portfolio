import React from "react";
import { useSelector } from "react-redux";
import {
  selectQuote,
  selectFetchingError,
  selectIsFetching,
} from "../features/quoteSlice";

function Quote() {
  const quote = useSelector(selectQuote);
  const isFetching = useSelector(selectIsFetching);
  const fetchingError = useSelector(selectFetchingError);

  if (isFetching) {
    return (
      <div className="quoteContainer">
        <p className="quote">Loading quote. Hang on a second!</p>
      </div>
    );
  }

  if (fetchingError) {
    return (
      <div className="quoteContainer">
        <p className="quote">Error reaching quote API</p>
      </div>
    );
  }

  return (
    <div className="quoteContainer">
      <p className="quote">
        {quote.quote} - {quote.author}
      </p>
    </div>
  );
}

export default Quote;
