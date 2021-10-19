import React from 'react';
import { Link } from 'react-router-dom';

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        console.log('search results props details ', props.details);
    }

    render() {
        return (
            <Link to={`/Restaurant/${this.props.details.email}`} >
                <div className="card mb-3" style={{maxWidth: "540px;"}}>
                    <div className="row g-0">
                        <div className="col-md-2">
                            <img 
                                src={this.props.details.profilePicture} 
                                className="img-fluid rounded-start" 
                                alt=""
                                style={{width: '10rem', height: '8rem'}} 
                            />
                        </div>
                        <div className="col-md-10">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {this.props.details.name}
                                </h5>
                                <p className="card-text">
                                    {this.props.details.description}
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">
                                        {this.props.details.city}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            
        );
    }
}

export default SearchResult;