import React from 'react';

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.details);
    }

    render() {
        return (
            <div className="card mb-3" style={{maxWidth: "540px;"}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img 
                            src={this.props.details.Display_Picture} 
                            className="img-fluid rounded-start" 
                            alt=""     
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                {this.props.details.name}
                            </h5>
                            <p className="card-text">
                                {this.props.details.description}
                            </p>
                            <p className="card-text">
                                <small className="text-muted">
                                    {this.props.details.City}
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchResult;