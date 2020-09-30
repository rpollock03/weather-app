import React, { useEffect, useState } from 'react';

import "./Header.css";

function Header(props) {

    const [showSearch, setShowSearch] = useState(false)


    function showSearchBar() {
        setShowSearch(!showSearch)
    }


    return (
        <div className="text-center">
            <h1 className="text-center title font-weight-bold">Weather in</h1>
            <div>
                <h3 className="search-bar" onClick={showSearchBar}><i class="fas fa-map-marker-alt"></i> {props.locationName}, {props.locationCountry}</h3>
                {showSearch ? (

                    <div className="input-group search-location col-8 col-md-6 mx-auto">
                        <input id="testingthis" placeholder="Enter a new location e.g. London" autocomplete="off" name="city" type="text" className="form-control text-muted form-rounded p-4 shadow-sm" />
                    </div>

                ) : null}
            </div>


        </div>




    )
}

export default Header