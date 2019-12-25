import React from 'react';
import { Row} from "react-bootstrap";


class PageNotFound extends React.Component {
    render() {
        return (
            <Row>
                <div className="col-md-12">
                    <h3 style={{textAlign: 'center',color:'aliceblue'}}>The page does not exist.</h3>
                </div>
            </Row>
        );
    }
}

export default PageNotFound;
