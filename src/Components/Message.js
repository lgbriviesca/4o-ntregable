import React from 'react';
import $ from 'jquery';

const Message = () => {

    (function() {
        $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      });

    return (
        <div>
             <p>
    <button id="success-btn">Success</button>
</p>
        </div>
    );
};

export default Message;