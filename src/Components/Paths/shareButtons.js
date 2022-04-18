import React from "react";

function shareButtons({ get }) {
  return (
    <div>
      <a
        href={`https://twitter.com/intent/tweet?text=clone-practice-30ea3.web.app/albums/${get}`}>
        Twitter
      </a>
    </div>
  );
}

export default shareButtons;
